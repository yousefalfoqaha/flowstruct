import { COURSE_ENDPOINT } from '@/features/course/constants.ts';
import { courseKeys } from '@/features/course/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const unarchiveCourse = (courseId: number) =>
  api.put<void>([COURSE_ENDPOINT, courseId, 'unarchive']);

export const useUnarchiveCourse = () =>
  useAppMutation({
    mutationFn: unarchiveCourse,
    meta: {
      invalidates: (_, courseId) => [courseKeys.lists(), courseKeys.detail(courseId)],
      successMessage: 'Course unarchived.',
    },
  });
