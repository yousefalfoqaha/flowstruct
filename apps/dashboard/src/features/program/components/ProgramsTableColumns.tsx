import { createColumnHelper } from '@tanstack/react-table';
import { Program } from '@/features/program/types.ts';
import { ProgramOptionsMenu } from '@/features/program/components/ProgramOptionsMenu.tsx';
import { Badge } from '@mantine/core';

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
    display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ProgramOptionsMenu program={row.original} />,
    }),
  ];
}
