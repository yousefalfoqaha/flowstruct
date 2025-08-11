import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { USER_ENDPOINT } from '@/features/user/constants.ts';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/shared/api.ts';

const logoutUser = () => api.post([USER_ENDPOINT, 'logout']);

export const useLogout = () => {
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate({ to: '/login' }).then();
    },
    meta: {
      successMessage: 'You are logged out.',
    },
  });
};
