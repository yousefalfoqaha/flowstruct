import { createColumnHelper } from '@tanstack/react-table';
import { Program } from '@/features/program/types.ts';
import { ProgramTableOptionsMenu } from '@/features/program/components/ProgramTableOptionsMenu.tsx';
import { Badge } from '@mantine/core';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';
import { OutdatedStatusBadge } from '@/shared/components/OutdatedStatusBadge.tsx';

export function getProgramsTableColumns() {
  const { display, accessor } = createColumnHelper<Program>();

  return [
    accessor('outdatedAt', {
      header: '',
      cell: ({ row }) => <OutdatedStatusBadge outdatedAt={row.original.outdatedAt} />,
    }),
    accessor('code', {
      header: 'Code',
      cell: ({ cell }) => <Badge variant="default">{cell.getValue()}</Badge>,
    }),
    accessor('name', {
      header: 'Name',
    }),
    accessor('degree', {
      header: 'Degree',
      enableColumnFilter: true,
      filterFn: 'equalsString',
    }),
    accessor('updatedAt', {
      header: 'Last Updated',
      cell: ({ row }) => (
        <LastUpdatedStats at={row.original.updatedAt} by={row.original.updatedBy} />
      ),
    }),
    display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ProgramTableOptionsMenu program={row.original} />,
    }),
  ];
}
