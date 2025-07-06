import { createFileRoute, redirect } from '@tanstack/react-router';
import { MeQuery } from '@/features/user/queries.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context: { queryClient } }) => {
    try {
      queryClient.ensureQueryData(MeQuery);
      redirect({ to: '/programs', search: DefaultSearchValues() });
    } catch {
      throw redirect({ to: '/login' });
    }
  },
});
