import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { FrameworkCoursesTable } from '@/features/study-plan/components/FrameworkCoursesTable.tsx';
import { DefaultFrameworkCoursesSearchValues } from '@/utils/defaultFrameworkCoursesSearchValues.ts';
import { getTableSearchSchema } from '@/shared/schemas.ts';

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/framework')({
  component: RouteComponent,
  loader: () => ({ crumb: 'Framework' }),
  validateSearch: getTableSearchSchema(DefaultFrameworkCoursesSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultFrameworkCoursesSearchValues())],
  },
});

function RouteComponent() {
  return <FrameworkCoursesTable />;
}
