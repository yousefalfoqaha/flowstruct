import { useEffect } from 'react';
import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { AuthContextType } from '@/contexts/AuthContext.tsx';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContextType;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const { status } = useRouterState();

  useEffect(() => {
    if (status === 'pending') nprogress.start();
    if (status === 'idle') nprogress.complete();
  }, [status]);

  return <Outlet />;
}
