import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { USER_ENDPOINT } from '@/features/user/constants.ts';
import { z } from 'zod/v4';
import { LoginSchema } from '@/features/user/schemas.ts';
import { api } from '@/shared/api.ts';

export const loginUser = (loginDetails: z.infer<typeof LoginSchema>) =>
  api.post([USER_ENDPOINT, 'login'], {
    body: loginDetails,
  });

export const useLogin = () =>
  useAppMutation({
    mutationFn: loginUser,
    meta: {
      successMessage: 'You are logged in. Redirecting...',
    },
  });
