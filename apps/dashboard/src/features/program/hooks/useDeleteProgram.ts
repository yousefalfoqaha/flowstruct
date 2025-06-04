import { useQueryClient } from '@tanstack/react-query';
import { deleteProgram } from '@/features/program/api.ts';
import { programKeys } from '@/features/program/queries.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useAppMutation(deleteProgram, {
    onSuccess: (_, programId) => {
      queryClient.removeQueries({ queryKey: programKeys.detail(programId) });
      queryClient.invalidateQueries({ queryKey: programKeys.list() });
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
    successNotification: { message: 'Program deleted.' },
  });
};
