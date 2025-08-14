import { createColumnHelper } from '@tanstack/react-table';
import { StudyPlanRow } from '@/features/study-plan/types.ts';
import { StudyPlanTableOptionsMenu } from '@/features/study-plan/components/StudyPlanTableOptionsMenu.tsx';
import { StatusBadge } from '@/shared/components/StatusBadge.tsx';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';
import { ActiveStatusBadge } from '@/shared/components/ActiveStatusBadge.tsx';

export function getStudyPlansTableColumns() {
  const { accessor, display } = createColumnHelper<StudyPlanRow>();

  return [
    accessor('isArchived', {
      header: '',
      cell: ({ row }) => <ActiveStatusBadge isArchived={row.original.isArchived} />,
    }),
    accessor('programName', {
      header: 'Program',
      enableColumnFilter: true,
      filterFn: 'equalsString',
    }),
    accessor('year', {
      header: 'Year',
      cell: ({ row }) => (
        <p style={{ textWrap: 'nowrap' }}>
          {row.original.year} - {row.original.year + 1}
        </p>
      ),
      enableColumnFilter: true,
      filterFn: 'equals',
    }),
    accessor('track', {
      header: 'Track',
      cell: ({ row }) => (row.getValue('track') === '' ? '---' : row.getValue('track')),
    }),
    accessor('status', {
      header: 'Status',
      cell: ({ row }) => StatusBadge(row.getValue('status')),
    }),
    display({
      id: 'last-updated',
      header: 'Last Updated',
      cell: ({ row }) => (
        <LastUpdatedStats at={row.original.updatedAt} by={row.original.updatedBy} />
      ),
    }),
    display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <StudyPlanTableOptionsMenu studyPlan={row.original} />,
    }),
  ];
}
