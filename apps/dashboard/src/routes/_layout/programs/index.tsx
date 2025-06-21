import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { ProgramsTable } from '@/features/program/components/ProgramsTable.tsx';
import { GraduationCap } from 'lucide-react';
import { TableSearchSchema } from '@/shared/schemas.ts';
import { getDefaultSearchValues } from '@/utils/getDefaultSearchValues.ts';
import { PageHeader } from '@/shared/components/PageHeader.tsx';
import { PageLayout } from '@/shared/components/PageLayout.tsx';

export const Route = createFileRoute('/_layout/programs/')({
  component: RouteComponent,
  validateSearch: TableSearchSchema,
  search: {
    middlewares: [stripSearchParams(getDefaultSearchValues())],
  },
});

function RouteComponent() {
  return (
    <PageLayout header={<PageHeader title="Programs" icon={<GraduationCap />} />}>
      <ProgramsTable />
    </PageLayout>
  );
}
