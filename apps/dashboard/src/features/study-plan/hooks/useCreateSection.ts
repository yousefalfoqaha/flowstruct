import { useQueryClient } from '@tanstack/react-query';
import { createSection } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useAppMutation(createSection, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
    successNotification: { message: 'Section created.' },
  });
};
