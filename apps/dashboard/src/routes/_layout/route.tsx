import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppLayout } from '@/shared/components/AppLayout.tsx';
import { UserListQuery } from '@/features/user/queries.ts';
import { StudyPlanListQuery } from '@/features/study-plan/queries.ts';
import { ProgramListQuery } from '@/features/program/queries.ts';

export const Route = createFileRoute('/_layout')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(UserListQuery);
    queryClient.ensureQueryData(StudyPlanListQuery);
    queryClient.ensureQueryData(ProgramListQuery);
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
