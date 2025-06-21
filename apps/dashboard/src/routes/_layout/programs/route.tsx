import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ProgramListQuery } from '@/features/program/queries.ts';

export const Route = createFileRoute('/_layout/programs')({
  component: () => <Outlet />,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(ProgramListQuery);
    return { crumb: 'Programs' };
  },
});
