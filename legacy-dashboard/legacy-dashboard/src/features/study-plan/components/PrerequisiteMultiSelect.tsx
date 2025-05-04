import {
    Button,
    Flex,
    FocusTrap,
    Group,
    MultiSelect,
    MultiSelectProps,
    Popover,
    SegmentedControl,
    Text,
} from "@mantine/core";
import React from "react";
import {CircleAlert, Link, Plus} from "lucide-react";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";
import {useLinkPrerequisites} from "@/features/study-plan/hooks/useLinkPrerequisites.ts";
import {CourseRelation, StudyPlan} from "@/features/study-plan/types.ts";
import {useLinkCorequisites} from "@/features/study-plan/hooks/useLinkCorequisites.ts";
import classes from "@/features/study-plan/components/CoursesMultiSelect.module.css";
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {CourseSummary} from "@/features/course/types.ts";

type CourseOption = {
    value: string;
    label: string;
    disabled: boolean;
    createsCycle: boolean;
}

type PrerequisiteMultiSelectProps = {
    courses: Record<number, CourseSummary>;
    parentCourseId: number;
    studyPlan: StudyPlan;
}

export function PrerequisiteMultiSelect({parentCourseId, courses, studyPlan}: PrerequisiteMultiSelectProps) {
    const [opened, setOpened] = React.useState(false);
    const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
    const [requisiteType, setRequisiteType] = React.useState<'PRE' | 'CO'>('PRE');

    const {coursesGraph} = useCoursesGraph();

    const linkPrerequisites = useLinkPrerequisites();
    const linkCorequisites = useLinkCorequisites();

    const handleAssignCourses = () => {
        if (requisiteType === "PRE") {
            linkPrerequisites.mutate(
                {
                    courseId: parentCourseId,
                    studyPlanId: studyPlan.id,
                    prerequisites: selectedCourses.map(id => ({
                        prerequisite: Number(id),
                        relation: CourseRelation.AND
                    }))
                },
                {
                    onSuccess: () => {
                        setOpened(false)
                        setSelectedCourses([]);
                    }
                }
            )
            return;
        }

        linkCorequisites.mutate(
            {
                courseId: parentCourseId,
                studyPlanId: studyPlan.id,
                corequisites: selectedCourses.map(id => parseInt(id))
            },
            {
                onSuccess: () => {
                    setOpened(false)
                    setSelectedCourses([]);
                    setRequisiteType("PRE");
                }
            }
        );
    }

    const data = studyPlan.sections.map(section => {
        const sectionCode = getSectionCode(section);
        const displayName = section.name
            ? `- ${section.name}`
            : (sectionCode.split('.').length > 2 ? "- General" : "");

        return {
            group: `${sectionCode}: ${section.level} ${section.type} ${displayName}`,
            items: section.courses
                .map(id => {
                    const course = courses[id];
                    if (!course) return null;

                    const prerequisites = studyPlan.coursePrerequisites[parentCourseId] ?? {};

                    if (prerequisites[id] !== undefined) return null;
                    if (parentCourseId === id) return null;

                    const createsCycle = coursesGraph.get(parentCourseId)?.postrequisiteSequence.has(id);

                    return {
                        value: id.toString(),
                        label: `${course.code}: ${course.name}`,
                        disabled: createsCycle,
                        createsCycle: createsCycle
                    } as CourseOption;
                })
                .filter((option): option is CourseOption => option !== null)
        };
    });

    const renderOption: MultiSelectProps['renderOption'] = ({option}) => {
        const courseOption = option as unknown as CourseOption;
        return (
            <div>
                <div className={classes.label}>{option.label}</div>

                {courseOption.createsCycle && (
                    <Text className={classes.warning}>
                        <Group gap={6}>
                            <CircleAlert size={14}/>
                            Creates cycle
                        </Group>
                    </Text>
                )}
            </div>
        );
    }

    const canAddRequisites = selectedCourses.length > 0;

    return (
        <Popover
            position="left-start"
            shadow="md"
            width={360}
            opened={opened}
            onChange={setOpened}
            withArrow
        >
            <Popover.Target>
                <Button
                    onClick={() => setOpened((o) => !o)}
                    radius="xl"
                    variant="subtle"
                    size="compact-xs"
                    leftSection={<Plus size={14}/>}
                >
                    Add
                </Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Flex direction="column" gap="sm">
                    <Group grow preventGrowOverflow={false} gap="xs" wrap="nowrap">
                        <SegmentedControl
                            value={requisiteType}
                            onChange={(val) => setRequisiteType(val as "PRE" | "CO")}
                            size="xs"
                            data={[
                                {label: 'PRE', value: 'PRE'},
                                {label: 'CO', value: 'CO'},
                            ]}
                        />

                        <Button
                            disabled={!canAddRequisites}
                            leftSection={<Link size={14}/>}
                            loading={linkPrerequisites.isPending || linkCorequisites.isPending}
                            onClick={handleAssignCourses}
                        >
                            Assign {requisiteType === 'PRE' ? 'Prerequisites' : 'Corequisites'}
                        </Button>
                    </Group>

                    <FocusTrap active={opened}>
                        <MultiSelect
                            comboboxProps={{
                                withinPortal: false,
                                classNames: {
                                    option: classes.option
                                }
                            }}
                            renderOption={renderOption}
                            data={data}
                            value={selectedCourses}
                            onChange={setSelectedCourses}
                            label={`Assign ${requisiteType === "PRE" ? 'prerequisites' : 'corequisites'} to ${courses[parentCourseId]?.code}`}
                            placeholder="Search framework courses"
                            searchable
                            hidePickedOptions
                        />
                    </FocusTrap>
                </Flex>
            </Popover.Dropdown>
        </Popover>
    );
}
