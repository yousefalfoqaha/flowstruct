import { createFileRoute, Navigate, redirect } from '@tanstack/react-router';
import { MeQuery } from '@/features/user/queries.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(MeQuery);
    } catch {
      throw redirect({ to: '/login' });
    }
  },
  component: () => <Navigate to="/study-plans" search={DefaultSearchValues()} />,
});
