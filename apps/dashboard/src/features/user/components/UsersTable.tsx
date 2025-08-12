import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { useUserList } from '@/features/user/hooks/useUserList.ts';
import { User } from '@/features/user/types.ts';
import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts';
import { UsersOptionMenu } from '@/features/user/components/UsersOptionMenu.tsx';
import { Stack } from '@mantine/core';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';

export function UsersTable() {
  const { data: users } = useUserList();

  const { accessor, display } = createColumnHelper<User>();
  const columns = React.useMemo(
    () => [
      accessor('username', {
        header: 'Username',
      }),
      accessor('email', {
        header: 'Email',
      }),
      accessor('role', {
        header: 'Role',
      }),
      accessor('createdAt', {
        header: 'Created At',
        cell: ({ row }) => formatTimeAgo(new Date(row.original.createdAt)),
      }),
      display({
        id: 'action',
        cell: ({ row }) => <UsersOptionMenu user={row.original} />,
      }),
    ],
    []
  );

  const table = useDataTable<User>({
    data: Object.values(users),
    columns,
  });

  return (
    <Stack>
      <DataTableSearch width={800} table={table} placeholder="Search any user..." />
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </Stack>
  );
}
