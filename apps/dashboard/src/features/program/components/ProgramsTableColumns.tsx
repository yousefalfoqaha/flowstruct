import { createColumnHelper } from '@tanstack/react-table';
import { Program } from '@/features/program/types.ts';
import { ProgramOptionsMenu } from '@/features/program/components/ProgramOptionsMenu.tsx';
import { Badge } from '@mantine/core';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';

export function getProgramsTableColumns() {
  const { display, accessor } = createColumnHelper<Program>();

  return [
    accessor('deletedAt', {
      header: '',
      cell: ({ row }) => (
        <Badge
          variant={row.original.deletedAt === null ? 'light' : 'outline'}
          color={row.original.deletedAt === null ? 'green' : 'gray'}
        >
          {row.original.deletedAt === null ? 'Active' : 'Archived'}
        </Badge>
      ),
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
      cell: ({ row }) => <ProgramOptionsMenu program={row.original} />,
    }),
  ];
}
