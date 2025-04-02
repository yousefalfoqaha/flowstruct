import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {Badge, Flex, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {SemesterCoursesMultiSelect} from "@/features/study-plan/components/SemesterCoursesMultiSelect.tsx";

export function ProgramMap() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: courses} = useCourseList(studyPlanId);

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
        <>
            <ScrollArea offsetScrollbars type="never">
                <Flex gap="xs" wrap="nowrap">
                    {academicYears.map((year) => {
                        const yearSemesters = semesterTypes.map((_, i) =>
                            year * SEMESTERS_PER_YEAR - (SEMESTERS_PER_YEAR - i) + 1
                        );

                        return (
                            <Stack align="center" gap="md" key={year}>
                                <Badge size="lg" variant="filled" px="xl">Year {year}</Badge>

                                <Flex gap="xs" wrap="nowrap">
                                    {yearSemesters.map((semesterNumber, index) => {
                                        const semesterCourses = coursesBySemester.get(semesterNumber);
                                        const semesterTotalCreditHours = semesterCourses?.reduce((sum, courseId) => sum + (courses[courseId]?.creditHours || 0), 0);

                                        return (
                                            <Stack miw={100} gap="xs" key={semesterNumber}>
                                                <Text
                                                    size="sm"
                                                    fw={600}
                                                    ta="center"
                                                    c="dimmed"
                                                >
                                                    {semesterTypes[index]} - {semesterTotalCreditHours} Cr.
                                                </Text>

                                                {semesterCourses?.map((courseId) => {
                                                    const course = courses[courseId];
                                                    const prerequisites = studyPlan.coursePrerequisites[courseId] ?? {};

                                                    const missingPrerequisites = Object.keys(prerequisites)
                                                        .filter(prereqId => {
                                                            const placement = studyPlan.coursePlacements[Number(prereqId)];
                                                            return placement === undefined || placement >= semesterNumber;
                                                        })
                                                        .map(prereqId => ({
                                                            id: Number(prereqId),
                                                            code: courses[Number(prereqId)].code
                                                        }));

                                                    if (!course) return;

                                                    return <CourseCard
                                                        key={courseId}
                                                        missingPrerequisites={missingPrerequisites}
                                                        course={course}
                                                    />
                                                })}

                                                <SemesterCoursesMultiSelect semester={semesterNumber}/>
                                            </Stack>
                                        );
                                    })}
                                </Flex>
                            </Stack>
                        );
                    })}
                </Flex>
            </ScrollArea>
        </>
    );
}