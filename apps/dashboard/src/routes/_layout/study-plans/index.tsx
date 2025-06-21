import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { StudyPlansTable } from '@/features/study-plan/components/StudyPlansTable.tsx';
import { ScrollText } from 'lucide-react';
import { TableSearchSchema } from '@/shared/schemas.ts';
import { getDefaultSearchValues } from '@/utils/getDefaultSearchValues.ts';
import { PageHeader } from '@/shared/components/PageHeader.tsx';
import { PageLayout } from '@/shared/components/PageLayout.tsx';

export const Route = createFileRoute('/_layout/study-plans/')({
  component: RouteComponent,
  validateSearch: TableSearchSchema,
  search: {
    middlewares: [stripSearchParams(getDefaultSearchValues())],
  },
});

function RouteComponent() {
  return (
    <PageLayout header={<PageHeader title="Study Plans" icon={<ScrollText />} />}>
      <StudyPlansTable />
    </PageLayout>
  );
}
