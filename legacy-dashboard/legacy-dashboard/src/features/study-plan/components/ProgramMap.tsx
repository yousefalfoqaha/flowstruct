import {Divider, Flex, ScrollArea, Stack, Text} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {CoursePlacementMultiSelect} from "@/features/study-plan/components/CoursePlacementMultiSelect.tsx";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {SemesterCoursesContainer} from "@/features/study-plan/components/SemesterCoursesContainer.tsx";

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
        <DndProvider backend={HTML5Backend}>
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

                                                <SemesterCoursesContainer
                                                    semesterNumber={semesterNumber}
                                                    semesterCourses={semesterCourses ?? []}
                                                    courses={courses}
                                                    studyPlan={studyPlan}
                                                />

                                                <CoursePlacementMultiSelect
                                                    courses={courses}
                                                    studyPlan={studyPlan}
                                                    semester={semesterNumber}
                                                />
                                            </Stack>
                                        );
                                    })}
                                </Flex>
                            </Stack>
                        );
                    })}
                </Flex>
            </ScrollArea>
        </DndProvider>
    );
}