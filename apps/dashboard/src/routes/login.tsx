import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '@/features/user/components/LoginForm.tsx';
import { MeQuery } from '@/features/user/queries.ts';

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(MeQuery);
      return redirect({ to: '/' });
    } catch (e) {
      return;
    }
  },
  component: RouteComponent,
});

export function RouteComponent() {
  return <LoginForm />;
}
