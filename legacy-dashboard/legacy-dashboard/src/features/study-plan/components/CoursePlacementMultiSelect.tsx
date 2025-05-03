import {ActionIcon, Button, Group, MultiSelect, MultiSelectProps, Popover, Stack, Text} from "@mantine/core";
import {BetweenHorizontalStart, CircleAlert, Plus} from "lucide-react";
import React from "react";
import {usePlaceSemesterCourses} from "@/features/study-plan/hooks/useAddCoursesToSemester.ts";
import classes from './CoursesMultiSelect.module.css';
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {CourseSummary} from "@/features/course/types.ts";

type CoursePlacementMultiSelectProps = {
    semester: number;
    studyPlan: StudyPlan;
    courses: Record<number, CourseSummary>;
}

interface CourseOption {
    label: string;
    value: string;
    disabled: boolean;
    alreadyAdded: boolean;
    unmetPrerequisites: string[];
}

export function CoursePlacementMultiSelect({semester, studyPlan, courses}: CoursePlacementMultiSelectProps) {
    const [opened, setOpened] = React.useState(false);
    const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);

    const placeCourses = usePlaceSemesterCourses();

    const handlePlaceCourses = () => placeCourses.mutate({
        studyPlanId: studyPlan.id,
        semester: semester,
        courseIds: selectedCourses.map(id => Number(id))
    }, {
        onSuccess: () => {
            setSelectedCourses([]);
            setOpened(false);
        }
    });

    if (!semester) return null;

    const data = studyPlan.sections
        .map(section => {
            const sectionCode = getSectionCode(section);
            const displayName = section.name
                ? `- ${section.name}`
                : (sectionCode.split('.').length > 2 ? "- General" : "");

            return {
                group: `${sectionCode}. ${section.level} ${section.type} ${displayName}`,
                items: section.courses.map(courseId => {
                    const course = courses[courseId];
                    if (!course) return null;

                    const prerequisites = studyPlan.coursePrerequisites[courseId] ?? {};
                    const unmetPrerequisites = Object.keys(prerequisites)
                        .filter((prerequisiteId) => {
                            const placement = studyPlan.coursePlacements[Number(prerequisiteId)];
                            return placement === undefined || placement >= semester;
                        });

                    if (studyPlan.coursePlacements[courseId] !== undefined) return null;

                    return {
                        label: `${course.code}: ${course.name}`,
                        value: courseId.toString(),
                        disabled: unmetPrerequisites.length > 0,
                        unmetPrerequisites,
                    } as CourseOption;
                }).filter((item): item is CourseOption => item !== null)
            }
        });

    const renderOption: MultiSelectProps['renderOption'] = ({option}) => {
        const courseOption = option as unknown as CourseOption;
        return (
            <div>
                <div className={classes.label}>{option.label}</div>

                {courseOption.disabled && courseOption.unmetPrerequisites.length > 0 && (
                    <Text className={classes.warning}>
                        <Group gap={6}>
                            <CircleAlert size={14}/>

                            Prerequisites: {courseOption.unmetPrerequisites.map(prerequisiteId => {
                            const prerequisite = courses[Number(prerequisiteId)];
                            return prerequisite?.code || prerequisiteId;
                        }).join(', ')}
                        </Group>
                    </Text>
                )}
            </div>
        );
    }

    return (
        <Popover
            trapFocus
            opened={opened}
            onChange={setOpened}
            withArrow
            shadow="md"
            width={360}
        >
            <Popover.Target>
                <ActionIcon
                    variant="transparent"
                    size="compact-xs"
                    onClick={() => setOpened((o) => !o)}
                >
                    <Plus size={18}/>
                </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown>
                <Stack>
                    <Button
                        disabled={selectedCourses.length === 0}
                        loading={placeCourses.isPending}
                        leftSection={<BetweenHorizontalStart size={18}/>}
                        onClick={handlePlaceCourses}
                    >
                        Place Courses
                    </Button>

                    <MultiSelect
                        comboboxProps={{
                            withinPortal: false,
                            classNames: {
                                option: classes.option
                            }
                        }}
                        withCheckIcon
                        renderOption={renderOption}
                        data={data}
                        value={selectedCourses}
                        onChange={setSelectedCourses}
                        label={`Add courses to semester ${semester}`}
                        placeholder="Search framework courses"
                        searchable
                        hidePickedOptions
                    />
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
}
