import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';
import { User } from '@/features/user/types.ts';
import { USER_ENDPOINT } from '@/features/user/constants.ts';
import { userKeys } from '@/features/user/queries.ts';

const editUserDetails = ({ userId, userDetails }: { userId: number; userDetails: Partial<User> }) =>
  api.put<User>([USER_ENDPOINT, userId], {
    body: userDetails,
  });

export const useEditUserDetails = () =>
  useAppMutation({
    mutationFn: editUserDetails,
    meta: {
      setData: (data) => userKeys.detail(data.id),
      invalidates: [userKeys.all],
      successMessage: 'User details updated.',
    },
  });
