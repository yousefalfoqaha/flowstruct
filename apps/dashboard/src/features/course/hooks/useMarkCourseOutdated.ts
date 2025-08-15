import { COURSE_ENDPOINT } from '@/features/course/constants.ts';
import { courseKeys } from '@/features/course/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const markCourseOutdated = (courseId: number) => 
  api.put<void>([COURSE_ENDPOINT, courseId, 'mark-outdated']);

export const useMarkCourseOutdated = () =>
  useAppMutation({
    mutationFn: markCourseOutdated,
    meta: {
      invalidates: (_, courseId) => [courseKeys.lists(), courseKeys.detail(courseId)],
      successMessage: 'Course marked as outdated.',
    },
  });
