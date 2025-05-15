import {CourseSummary} from "@/features/course/types.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {Flex} from "@mantine/core";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {useDrop} from "react-dnd";
import {useMoveCourseToSemester} from "@/features/study-plan/hooks/useMoveCourseToSemester.ts";

type Props = {
    semesterNumber: number;
    semesterCourses: number[];
    courses: Record<number, CourseSummary>;
    studyPlan: StudyPlan;
}

export function SemesterCoursesContainer({semesterNumber, semesterCourses, courses, studyPlan}: Props) {
    const moveCourseToSemester = useMoveCourseToSemester();

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'COURSE',
        drop: (item, monitor) => {
            moveCourseToSemester.mutate({
                studyPlanId: studyPlan.id,
                courseId: item.id,
                targetSemester: semesterNumber
            })
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    return (
        <div
            ref={drop}
            role={'Dustbin'}
            style={{opacity: isOver ? 0.5 : 1}}
        >
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
            </Flex>
        </div>
    );
}