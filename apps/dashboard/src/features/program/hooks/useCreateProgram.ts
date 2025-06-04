import { useQueryClient } from '@tanstack/react-query';
import { createProgram } from '@/features/program/api.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { programKeys } from '@/features/program/queries.ts';
import { getProgramDisplayName } from '@/utils/getProgramDisplayName.ts';

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useAppMutation(createProgram, {
    onSuccess: (data) => {
      queryClient.setQueryData(programKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: programKeys.list() });
    },
    successNotification: { message: (data) => `${getProgramDisplayName(data)} created.` },
  });
};
