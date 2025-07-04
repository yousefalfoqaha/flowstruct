import { createFileRoute, Navigate } from '@tanstack/react-router';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/programs" search={DefaultSearchValues()} />;
}
