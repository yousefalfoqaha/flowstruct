import { useSuspenseQuery } from '@tanstack/react-query';
import { CourseQuery } from '@/features/course/queries.ts';
import { useParams } from '@tanstack/react-router';

export const useRouteCourse = () => {
  const { courseId } = useParams({ from: '/_layout/courses/$courseId' });
  return useSuspenseQuery(CourseQuery(Number(courseId)));
};
