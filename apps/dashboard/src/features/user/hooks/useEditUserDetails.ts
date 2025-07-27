import { useQueryClient } from '@tanstack/react-query';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { editUserDetails } from '@/features/user/api.ts';
import { userKeys } from '@/features/user/queries.ts';

export const useEditUserDetails = () => {
  const queryClient = useQueryClient();

  return useAppMutation(editUserDetails, {
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
    successNotification: {
      message: 'User details updated.'
    }
  });
};
