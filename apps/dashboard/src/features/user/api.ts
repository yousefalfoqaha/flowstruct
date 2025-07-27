import { api } from '@/shared/api.ts';
import { User } from '@/features/user/types.ts';
import { z } from 'zod/v4';
import { LoginSchema } from '@/features/user/schemas.ts';

const ENDPOINT = '/users';

export const loginUser = (loginDetails: z.infer<typeof LoginSchema>) =>
  api.post([ENDPOINT, 'login'], {
    body: loginDetails,
  });

export const getMe = () => api.get<User>([ENDPOINT, 'me']);

export const logoutUser = () => api.post([ENDPOINT, 'logout']);

export const getUserList = () => api.get<Record<number, User>>([ENDPOINT]);

export const editUserDetails = ({ details }: { details: Partial<User> }) =>
  api.put<User>([ENDPOINT, 'me'], {
    body: details,
  });

export const changePassword = ({
  currentPassword,
  newPassword,
  confirmPassword,
}: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) =>
  api.put<void>([ENDPOINT, 'me', 'password'], {
    body: {
      currentPassword,
      newPassword,
      confirmPassword,
    },
  });
