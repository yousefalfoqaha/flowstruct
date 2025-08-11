import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { USER_ENDPOINT } from '@/features/user/constants.ts';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/shared/api.ts';
import { useQueryClient } from '@tanstack/react-query';

const logoutUser = () => api.post([USER_ENDPOINT, 'logout']);

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate({ to: '/login' });
      queryClient.cancelQueries()
        .then(() => queryClient.clear());
    },
    meta: {
      successMessage: 'You are logged out.',
    },
  });
};
