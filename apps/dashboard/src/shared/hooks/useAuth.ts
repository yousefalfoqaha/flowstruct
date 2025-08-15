import { MeQuery, userKeys } from '@/features/user/queries';
import { Role, User, UserAction } from '@/features/user/types.ts';
import { useQueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';

const RolePermissions: Record<keyof typeof Role, () => UserAction[]> = {
  GUEST: () => [] as const,
  EDITOR: () => [...RolePermissions.GUEST(), 'study-plans:request-approval'] as const,
  APPROVER: () => [...RolePermissions.GUEST(), 'study-plans:approve'] as const,
  ADMIN: () =>
    [
      ...RolePermissions.APPROVER(),
      'users:read',
      'programs:delete',
      'courses:delete',
      'study-plans:delete',
    ] as const,
};

export interface AuthInterface {
  ensureAuthentication: () => void;
  hasPermission: (action: UserAction) => boolean;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const ensureAuthentication = () => {
    try {
      queryClient.ensureQueryData(MeQuery);
    } catch {
      redirect({
        to: '/login',
      });
    }
  };

  const hasPermission = (action: UserAction) => {
    const me: User | undefined = queryClient.getQueryData(userKeys.me());
    if (!me) return false;

    const myPermissions = RolePermissions[me.role as keyof typeof Role];

    return myPermissions().includes(action);
  };

  return {
    ensureAuthentication,
    hasPermission,
  };
};
