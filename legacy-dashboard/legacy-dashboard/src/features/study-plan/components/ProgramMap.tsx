import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {Divider, Flex, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {CoursePlacementMultiSelect} from "@/features/study-plan/components/CoursePlacementMultiSelect.tsx";
import {useStudyPlanCourses} from "@/features/course/hooks/useStudyPlanCourses.ts";

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

                                                    const unmetPrerequisite = (prerequisiteId: string) => {
                                                        const placement = studyPlan.coursePlacements[Number(prerequisiteId)];
                                                        return placement === undefined || placement >= semesterNumber;
                                                    };

                                                    const missingPrerequisites = Object.keys(prerequisites)
                                                        .filter(unmetPrerequisite)
                                                        .map(prerequisiteId => ({
                                                            id: Number(prerequisiteId),
                                                            code: courses[Number(prerequisiteId)].code
                                                        }));

                                                    if (!course) return;

                                                    return (
                                                        <CourseCard
                                                            key={courseId}
                                                            studyPlanId={studyPlan.id}
                                                            missingPrerequisites={missingPrerequisites}
                                                            course={course}
                                                        />
                                                    );
                                                })}

                                                <CoursePlacementMultiSelect
                                                    courses={courses}
                                                    studyPlan={studyPlan}
                                                    semester={semesterNumber}
                                                />
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
    );
}