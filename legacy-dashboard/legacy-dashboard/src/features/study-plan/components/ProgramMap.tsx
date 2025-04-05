import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {Divider, Flex, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {SemesterCoursesMultiSelect} from "@/features/study-plan/components/SemesterCoursesMultiSelect.tsx";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useCourseList();

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
                            <Stack align="center" gap="xs" key={year}>
                                <Divider
                                    w="100%"
                                    labelPosition="center"
                                    variant="dashed"
                                    label={
                                        <>
                                            <Text size="xs">Year {year}</Text>
                                        </>
                                    }
                                />

                                <Flex gap="xs" wrap="nowrap">
                                    {yearSemesters.map((semesterNumber, index) => {
                                        const semesterCourses = coursesBySemester.get(semesterNumber);
                                        const semesterTotalCreditHours = semesterCourses?.reduce((sum, courseId) => sum + (courses[courseId]?.creditHours || 0), 0);

                                        return (
                                            <Stack miw={100} gap="sm" key={semesterNumber}>
                                                <Text
                                                    size="xs"
                                                    ta="center"
                                                    c="dimmed"
                                                >
                                                    {semesterTypes[index]} - {semesterTotalCreditHours} Cr.
                                                </Text>

                                                <Flex direction="column" gap="xs">
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
                                                            studyPlanId={studyPlan.id}
                                                            missingPrerequisites={missingPrerequisites}
                                                            course={course}
                                                        />
                                                    })}

                                                    <SemesterCoursesMultiSelect semester={semesterNumber}/>
                                                </Flex>
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