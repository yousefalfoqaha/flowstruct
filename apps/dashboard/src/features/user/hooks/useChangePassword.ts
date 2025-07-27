import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { changePassword } from '@/features/user/api.ts';

export const useChangePassword = () => {
  return useAppMutation(changePassword, {
    successNotification: {
      message: 'Password changed.',
    },
  });
};
