import { useQueryClient } from '@tanstack/react-query';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { publishStudyPlans } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';

export const usePublishStudyPlans = () => {
  const queryClient = useQueryClient();

  return useAppMutation(publishStudyPlans, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.all });
    },
    successNotification: {
      message: 'Study plans published.',
    },
  });
};
