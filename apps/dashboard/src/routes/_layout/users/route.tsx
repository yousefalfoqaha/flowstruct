import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/users')({
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.hasPermission('users:read')) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <Outlet />,
});
