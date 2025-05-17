import {Divider, Flex, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {SemesterCoursesContainer} from "@/features/study-plan/components/SemesterCoursesContainer.tsx";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();

    const academicYears = Array.from({length: studyPlan.duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

    const coursesBySemester = new Map<number, number[]>(
        Array.from({length: studyPlan.duration * SEMESTERS_PER_YEAR}, (_, i) => [i + 1, []])
    );

    Object.entries(studyPlan.coursePlacements ?? {}).forEach(([courseId, semesterNum]) => {
        coursesBySemester.get(Number(semesterNum))?.push(Number(courseId));
    });

    const {allowedSemesters, movingCourse} = useProgramMap()

    return (
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

                            <Flex h="100%" gap="xs" wrap="nowrap">
                                {yearSemesters.map((semesterNumber, index) => {
                                    const semesterCourses = coursesBySemester.get(semesterNumber);
                                    const semesterTotalCreditHours = semesterCourses?.reduce((sum, courseId) => sum + (courses[courseId]?.creditHours || 0), 0);

                                    const title = `${semesterTypes[index]} - ${semesterTotalCreditHours} Cr.`;

                                    return (
                                        <SemesterCoursesContainer
                                            semesterNumber={semesterNumber}
                                            semesterCourses={semesterCourses ?? []}
                                            courses={courses}
                                            studyPlan={studyPlan}
                                            title={title}
                                        />
                                    );
                                })}
                            </Flex>
                        </Stack>
                    );
                })}
            </Flex>
        </ScrollArea>
    );
}