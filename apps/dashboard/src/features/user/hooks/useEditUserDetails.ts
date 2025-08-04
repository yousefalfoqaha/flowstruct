import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { USER_ENDPOINT } from '@/features/user/constants.ts';
import { userKeys } from '@/features/user/queries.ts';
import { User } from '@/features/user/types.ts';
import { api } from '@/shared/api.ts';

const editUserDetails = ({ details }: { details: Partial<User> }) =>
  api.put<User>([USER_ENDPOINT, 'me'], {
    body: details,
  });

export const useEditUserDetails = () =>
  useAppMutation({
    mutationFn: editUserDetails,
    meta: {
      setData: () => userKeys.me(),
      invalidates: [userKeys.list()],
      successMessage: 'User details updated.',
    },
  });
