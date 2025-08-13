import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { useUserList } from '@/features/user/hooks/useUserList.ts';
import { Role, User } from '@/features/user/types.ts';
import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts';
import { UsersOptionMenu } from '@/features/user/components/UsersOptionMenu.tsx';
import { Group, Stack } from '@mantine/core';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { ColumnFilterSelect } from '@/shared/components/ColumnFilterSelect.tsx';
import { Shield } from 'lucide-react';

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
        filterFn: 'equalsString',
      }),
      accessor('createdAt', {
        header: 'Created At',
        cell: ({ row }) => formatTimeAgo(new Date(row.original.createdAt)),
      }),
      display({
        id: 'action',
        header: 'Actions',
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
      <Group>
        <DataTableSearch width={500} table={table} placeholder="Search any user..." />
        <ColumnFilterSelect
          leftSection={<Shield size={16} />}
          table={table}
          columnId="role"
          placeholder="Filter by role..."
          data={Object.entries(Role).map(([key, label]) => ({
            value: key,
            label,
          }))}
          w={200}
        />
      </Group>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </Stack>
  );
}
