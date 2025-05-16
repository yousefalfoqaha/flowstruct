import {CourseSummary} from "@/features/course/types.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {Flex} from "@mantine/core";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {useMoveCourseToSemester} from "@/features/study-plan/hooks/useMoveCourseToSemester.ts";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";

type Props = {
    semesterNumber: number;
    semesterCourses: number[];
    courses: Record<number, CourseSummary>;
    studyPlan: StudyPlan;
}

export function SemesterCoursesContainer({semesterNumber, semesterCourses, courses, studyPlan}: Props) {
    const moveCourseToSemester = useMoveCourseToSemester();

    const {allowedSemesters} = useProgramMap();
    return (
        <Flex direction="column" gap="xs">
            {allowedSemesters.has(semesterNumber) ? 'yes' : 'no'}
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
        </Flex>
    );
}