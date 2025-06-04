import { useQueryClient } from '@tanstack/react-query';
import { editSectionDetails } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useEditSectionDetails = () => {
  const queryClient = useQueryClient();

  return useAppMutation(editSectionDetails, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
    successNotification: { message: 'Section details updated.' },
  });
};
