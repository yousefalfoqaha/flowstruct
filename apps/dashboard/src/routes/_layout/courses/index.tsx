import { createFileRoute, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { CoursesTable } from '@/features/course/components/CoursesTable.tsx';
import { TableSearchSchema } from '@/shared/schemas.ts';
import { getDefaultSearchValues } from '@/utils/getDefaultSearchValues.ts';
import { PageHeader } from '@/shared/components/PageHeader.tsx';
import { PageLayout } from '@/shared/components/PageLayout.tsx';

export const Route = createFileRoute('/_layout/courses/')({
  component: RouteComponent,
  validateSearch: TableSearchSchema,
  search: {
    middlewares: [
      stripSearchParams(getDefaultSearchValues()),
      retainSearchParams(['page', 'size']),
    ],
  },
});

function RouteComponent() {
  return (
    <PageLayout header={<PageHeader title="Courses" icon={<BookOpen />} />}>
      <CoursesTable />
    </PageLayout>
  );
}
