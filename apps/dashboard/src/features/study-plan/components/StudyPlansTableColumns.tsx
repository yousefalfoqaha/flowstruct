import { createColumnHelper } from '@tanstack/react-table';
import { StudyPlanRow } from '@/features/study-plan/types.ts';
import { StudyPlanOptionsMenu } from '@/features/study-plan/components/StudyPlanOptionsMenu.tsx';
import { publishStatusBadge } from '@/shared/components/PublishStatusBadge.tsx';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';

export function getStudyPlansTableColumns() {
  const { accessor, display } = createColumnHelper<StudyPlanRow>();

  return [
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
    accessor('duration', {
      header: () => <p className="text-nowrap">Duration</p>,
      cell: ({ row }) => <p>{row.original.duration ?? 0} Years</p>,
    }),
    accessor('track', {
      header: 'Track',
      cell: ({ row }) => row.getValue('track') ?? '---',
    }),
    accessor('isPublished', {
      header: 'Status',
      cell: ({ row }) => publishStatusBadge(row.getValue('isPublished')),
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
      cell: ({ row }) => <StudyPlanOptionsMenu studyPlan={row.original} />,
    }),
  ];
}
