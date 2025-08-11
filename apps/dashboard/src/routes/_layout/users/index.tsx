import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/users/')({
  component: () => <Navigate to="/users" />,
});
