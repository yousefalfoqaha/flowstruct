import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { cloneStudyPlan } from '@/features/study-plan/api.ts';
import { useQueryClient } from '@tanstack/react-query';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';

export const useCloneStudyPlan = () => {
  const queryClient = useQueryClient();

  return useAppMutation(cloneStudyPlan, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
    successNotification: { message: 'Study plan cloned.' },
  });
};
