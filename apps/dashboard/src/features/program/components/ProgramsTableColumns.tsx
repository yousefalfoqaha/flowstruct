import { createColumnHelper } from '@tanstack/react-table';
import { Program } from '@/features/program/types.ts';
import { ProgramOptionsMenu } from '@/features/program/components/ProgramOptionsMenu.tsx';
import { Badge } from '@mantine/core';
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';

export function getProgramsTableColumns() {
  const { display, accessor } = createColumnHelper<Program>();

  return [
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
      cell: ({ row }) => formatTimeAgo(new Date(row.original.updatedAt)),
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
      cell: ({ row }) => <ProgramOptionsMenu program={row.original} />,
    }),
  ];
}
