import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/shared/components/AppLayout.tsx';
import { MeQuery, UserListQuery } from '@/features/user/queries.ts';

export const Route = createFileRoute('/_layout')({
  beforeLoad: ({ context: { queryClient } }) => {
    try {
      queryClient.ensureQueryData(MeQuery);
    } catch {
      throw redirect({ to: '/login' });
    }

    queryClient.ensureQueryData(UserListQuery);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
