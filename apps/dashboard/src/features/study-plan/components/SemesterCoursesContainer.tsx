import { CourseSummary } from '@/features/course/types.ts';
import { StudyPlan } from '@/features/study-plan/types.ts';
import { Flex, Stack, Text } from '@mantine/core';
import { CourseCard } from '@/features/course/components/CourseCard.tsx';
import { useMoveCourseToSemester } from '@/features/study-plan/hooks/useMoveCourseToSemester.ts';
import { useProgramMap } from '@/contexts/ProgramMapContext.tsx';
import classes from './SemesterCoursesContainer.module.css';
import { CoursePlacementMultiSelect } from '@/features/study-plan/components/CoursePlacementMultiSelect.tsx';
import { ArrowLeftRight } from 'lucide-react';

type Props = {
  semesterNumber: number;
  semesterCourses: number[];
  courses: Record<number, CourseSummary>;
  studyPlan: StudyPlan;
  title: string;
};

export function SemesterCoursesContainer({
  semesterNumber,
  semesterCourses,
  courses,
  studyPlan,
  title,
}: Props) {
  const moveCourseToSemester = useMoveCourseToSemester();
  const { allowedPlacements, movingCourse, moveCourse } = useProgramMap();

  const movingCourseInSemester =
    movingCourse && studyPlan.coursePlacements[movingCourse] === semesterNumber;

  const handleMoveCourse = () => {
    if (!movingCourse || !allowedPlacements.has(semesterNumber)) return;

    moveCourseToSemester.mutate({
      studyPlanId: studyPlan.id,
      targetSemester: semesterNumber,
      courseId: movingCourse,
    });

    moveCourse(null);
  };

  const getContainerClass = () => {
    if (!movingCourse) {
      return classes.semesterContainer;
    }

    if (studyPlan.coursePlacements[movingCourse] === semesterNumber) {
      return classes.containerMoving;
    }

    return allowedPlacements.has(semesterNumber)
      ? classes.containerEnabled
      : classes.containerDisabled;
  };

  return (
    <Stack
      className={classes.content}
      style={{
        pointerEvents: movingCourseInSemester ? 'none' : 'all',
      }}
      miw={100}
      gap="sm"
      key={semesterNumber}
    >
      <Text size="xs" ta="center" c="dimmed">
        {title}
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
            .map((prerequisiteId) => ({
              id: Number(prerequisiteId),
              code: courses[Number(prerequisiteId)].code,
            }));

          if (!course) return null;

          return (
            <CourseCard
              key={courseId}
              semesterNumber={semesterNumber}
              studyPlanId={studyPlan.id}
              course={course}
            />
          );
        })}
      </Flex>

      <div onClick={handleMoveCourse} className={getContainerClass()}>
        {getContainerClass() === classes.containerEnabled && (
          <Text className={classes.moveHereText}>
            <ArrowLeftRight size={32} />
          </Text>
        )}
      </div>

      <CoursePlacementMultiSelect
        courses={courses}
        studyPlan={studyPlan}
        semester={semesterNumber}
      />
    </Stack>
  );
}
