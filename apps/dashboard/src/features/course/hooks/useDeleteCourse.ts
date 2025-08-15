import { COURSE_ENDPOINT } from '@/features/course/constants.ts';
import { courseKeys } from '@/features/course/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const deleteCourse = (courseId: number) => api.delete<void>([COURSE_ENDPOINT, courseId]);

export const useDeleteCourse = () =>
  useAppMutation({
    mutationFn: deleteCourse,
    meta: {
      invalidates: () => [courseKeys.lists()],
      successMessage: 'Course deleted successfully.',
    },
  });
