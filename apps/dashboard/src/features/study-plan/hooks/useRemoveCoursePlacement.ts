import { useQueryClient } from '@tanstack/react-query';
import { removeCourseFromSemester } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useRemoveCoursePlacement = () => {
  const queryClient = useQueryClient();

  return useAppMutation(removeCourseFromSemester, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
  });
};
