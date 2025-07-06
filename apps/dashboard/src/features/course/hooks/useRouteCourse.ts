import { useSuspenseQuery } from '@tanstack/react-query';
import { CourseQuery } from '@/features/course/queries.ts';
import { useParams } from '@tanstack/react-router';

export const useRouteCourse = () => {
  const { courseId } = useParams({strict: false});
  if (!courseId) throw new Error("useRouteCourse must be used within a route with a course ID path param.");

  return useSuspenseQuery(CourseQuery(Number(courseId)));
};
