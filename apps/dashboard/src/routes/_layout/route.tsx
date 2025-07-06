import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppLayout } from '@/shared/components/AppLayout.tsx';
import { UserListQuery } from '@/features/user/queries.ts';

export const Route = createFileRoute('/_layout')({
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
