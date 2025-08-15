import { COURSE_ENDPOINT } from '@/features/course/constants.ts';
import { courseKeys } from '@/features/course/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const markCourseActive = (courseId: number) => 
  api.put<void>([COURSE_ENDPOINT, courseId, 'mark-active']);

export const useMarkCourseActive = () =>
  useAppMutation({
    mutationFn: markCourseActive,
    meta: {
      invalidates: (_, courseId) => [courseKeys.lists(), courseKeys.detail(courseId)],
      successMessage: 'Course marked as active.',
    },
  });
