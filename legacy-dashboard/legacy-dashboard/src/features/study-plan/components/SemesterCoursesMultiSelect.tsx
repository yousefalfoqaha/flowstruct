import {ActionIcon, Button, Group, MultiSelect, MultiSelectProps, Popover, Stack, Text} from "@mantine/core";
import {Check, Plus} from "lucide-react";
import React from "react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useAddCoursesToSemester} from "@/features/study-plan/hooks/useAddCoursesToSemester.ts";
import classes from './SemesterCoursesMultiSelect.module.css';

type SemesterCoursesMultiSelectProps = {
    semester: number;
}

interface CourseOption {
    label: string;
    value: string;
    disabled: boolean;
    alreadyAdded: boolean;
    unmetPrerequisites: string[];
}

export function SemesterCoursesMultiSelect({semester}: SemesterCoursesMultiSelectProps) {
    const [opened, setOpened] = React.useState(false);
    const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);

    const addCoursesToSemester = useAddCoursesToSemester();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    if (!semester) return null;
    if (!courses || !studyPlan) return null;

    const data = studyPlan.sections
        .flatMap((s) => s.courses)
        .map((courseId) => {
            const course = courses[courseId];
            if (!course) return null;

            const prerequisites = studyPlan.coursePrerequisites[courseId] ?? {};
            const unmetPrerequisites = Object.keys(prerequisites)
                .filter((prereqId) => {
                    const placement = studyPlan.coursePlacements[Number(prereqId)];
                    return placement === undefined || placement >= semester;
                });

            if (studyPlan.coursePlacements[courseId] !== undefined) return null;

            return {
                label: `${course.code}: ${course.name}`,
                value: courseId.toString(),
                disabled: unmetPrerequisites.length > 0,
                unmetPrerequisites,
            } as CourseOption;
        }).filter((item): item is CourseOption => item !== null);

    const renderOption: MultiSelectProps['renderOption'] = ({option}) => {
        const courseOption = option as unknown as CourseOption;

        return (
            <div>
                <Group gap="xs" wrap="nowrap" className={classes.label}>
                    <div>{option.label}</div>
                </Group>

                {courseOption.disabled && courseOption.unmetPrerequisites.length > 0 && (
                    <Text className={classes.prerequisitesWarning}>
                        Prerequisites: {courseOption.unmetPrerequisites.map(prereqId => {
                        const prereqCourse = courses[Number(prereqId)];
                        return prereqCourse?.code || prereqId;
                    }).join(', ')}
                    </Text>
                )}
            </div>
        );
    };

    return (
        <Popover
            trapFocus
            opened={opened}
            onChange={setOpened}
            withArrow
            shadow="md"
            width={300}
        >
            <Popover.Target>
                <ActionIcon
                    variant="white"
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
                        loading={addCoursesToSemester.isPending}
                        leftSection={<Plus size={18}/>}
                        onClick={() => addCoursesToSemester.mutate({
                            studyPlanId: studyPlanId,
                            semester: semester,
                            courseIds: selectedCourses.map(id => Number(id))
                        }, {
                            onSuccess: () => {
                                setSelectedCourses([]);
                                setOpened(false);
                            }
                        })}
                    >
                        Add Courses
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