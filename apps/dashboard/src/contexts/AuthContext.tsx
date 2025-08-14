import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MeQuery } from '@/features/user/queries';
import { Role, User, UserAction } from '@/features/user/types';
import { LoadingOverlay } from '@mantine/core';

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  hasPermission: (action: UserAction) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const { data: me, isLoading } = useQuery({
    ...MeQuery,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingOverlay visible zIndex={1000} loaderProps={{ type: 'bars' }} />;

  const hasPermission = (action: UserAction) => {
    if (!me) return false;

    const myPermissions = RolePermissions[me.role];

    return myPermissions().includes(action);
  };

  return (
    <AuthContext.Provider value={{ user: me, isAuthenticated: !!me, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
