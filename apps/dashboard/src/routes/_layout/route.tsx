import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/shared/components/AppLayout.tsx';
import { MeQuery, UserListQuery } from '@/features/user/queries.ts';

export const Route = createFileRoute('/_layout')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(MeQuery);
    } catch (e) {
      throw redirect({ to: '/login' });
    }
  },
  loader: ({ context: { queryClient } }) => {
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
