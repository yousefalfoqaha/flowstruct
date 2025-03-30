import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {Plus} from "lucide-react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {Button, Center, Group, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function ProgramMapTab() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const academicYears = Array.from({length: studyPlan.duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

    const coursesBySemester = new Map<number, number[]>(
        Array.from({length: studyPlan.duration * SEMESTERS_PER_YEAR}, (_, i) => [i + 1, []])
    );

    Object.entries(studyPlan.coursePlacements ?? {}).forEach(([courseId, semesterNum]) => {
        coursesBySemester.get(Number(semesterNum))?.push(Number(courseId));
    });

    if (!courses) return;

    return (
        <ScrollArea offsetScrollbars type="never">
            <Group wrap="nowrap">
                {academicYears.map((year) => {
                    const yearSemesters = semesterTypes.map((_, i) =>
                        year * SEMESTERS_PER_YEAR - (SEMESTERS_PER_YEAR - i) + 1
                    );

                    return (
                        <div key={year}>
                            <Text ta="center">Year {year}</Text>
                            <Group wrap="nowrap">
                                {yearSemesters.map((semesterNumber, index) => {
                                    const semesterCourses = coursesBySemester.get(semesterNumber);

                                    return (
                                        <div key={semesterNumber}>
                                            <Stack align="center">
                                                <Text>{semesterTypes[index]}</Text>
                                                <Text>{semesterCourses?.reduce((sum, courseId) => sum + (courses[courseId]?.creditHours || 0), 0)} Cr.
                                                    Hrs
                                                </Text>
                                            </Stack>

                                            {semesterCourses?.map((courseId) => {
                                                const course = courses[courseId];
                                                if (!course) return;

                                                return (
                                                    <CourseCard key={courseId} course={course}/>
                                                );
                                            })}
                                            <Button
                                                variant="subtle"
                                                leftSection={<Plus size={14}/>}
                                            >
                                                Add Courses
                                            </Button>
                                        </div>
                                    );
                                })}
                            </Group>
                        </div>
                    );
                })}
            </Group>
        </ScrollArea>
    );
}