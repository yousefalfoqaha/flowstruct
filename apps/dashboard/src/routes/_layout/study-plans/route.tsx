import { createFileRoute, Outlet } from '@tanstack/react-router';
import { StudyPlanListQuery } from '@/features/study-plan/queries.ts';
import { ProgramListQuery } from '@/features/program/queries.ts';

export const Route = createFileRoute('/_layout/study-plans')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(StudyPlanListQuery);
    queryClient.ensureQueryData(ProgramListQuery);

    return {
      crumb: 'Study Plans',
    };
  },
  component: () => <Outlet />,
});
