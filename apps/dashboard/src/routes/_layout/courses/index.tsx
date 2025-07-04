import { createFileRoute, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { CoursesTable } from '@/features/course/components/CoursesTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/_layout/courses/')({
  component: RouteComponent,
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [
      stripSearchParams(DefaultSearchValues()),
      retainSearchParams(['page', 'size']),
    ],
  },
});

function RouteComponent() {
  return <CoursesTable />;
}
