import { Role, User, UserAction } from '@/features/user/types.ts';
import { userKeys } from '@/features/user/queries.ts';
import { useQueryClient } from '@tanstack/react-query';

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

export const usePermission = () => {
  const queryClient = useQueryClient();

  const hasPermission = (action: UserAction) => {
    const me: User | undefined = queryClient.getQueryData(userKeys.me());
    if (!me) return false;

    const myPermissions = RolePermissions[me.role as keyof typeof Role];

    return myPermissions().includes(action);
  };

  return { hasPermission };
};
