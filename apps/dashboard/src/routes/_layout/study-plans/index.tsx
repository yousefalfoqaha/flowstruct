import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { StudyPlansTable } from '@/features/study-plan/components/StudyPlansTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/_layout/study-plans/')({
  component: RouteComponent,
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues())],
  },
});

function RouteComponent() {
  return <StudyPlansTable />;
}
