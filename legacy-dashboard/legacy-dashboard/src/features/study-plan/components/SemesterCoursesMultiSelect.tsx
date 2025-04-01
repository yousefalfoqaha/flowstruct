import {ActionIcon, Button, MultiSelect, Popover, Stack} from "@mantine/core";
import {Plus} from "lucide-react";
import React from "react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useAddCoursesToSemester} from "@/features/study-plan/hooks/useAddCoursesToSemester.ts";

type SemesterCoursesMultiSelectProps = {
    semester: number;
}

export function SemesterCoursesMultiSelect({semester}: SemesterCoursesMultiSelectProps) {
    const [opened, setOpened] = React.useState(false);
    const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);

    const addCoursesToSemester = useAddCoursesToSemester();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    if (!semester) return;

    const data = studyPlan.sections
        .flatMap(s => s.courses)
        .map(courseId => {
            const course = courses[courseId];
            if (!course) return;

            return {
                label: `${course.code}: ${course.name}`,
                value: courseId.toString()
            }
        })
        .filter(Boolean);

    return (
        <Popover
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
                        comboboxProps={{withinPortal: false}}
                        withCheckIcon
                        data={data}
                        value={selectedCourses}
                        onChange={setSelectedCourses}
                        label={`Add courses to semester ${semester}`}
                        placeholder="Search framework courses"
                        searchable
                    />
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
}
