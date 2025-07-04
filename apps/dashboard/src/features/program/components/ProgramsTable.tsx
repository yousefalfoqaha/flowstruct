import { DataTable } from '@/shared/components/DataTable.tsx';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { getProgramsTableColumns } from '@/features/program/components/ProgramsTableColumns.tsx';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { Program } from '@/features/program/types.ts';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { Group, Stack } from '@mantine/core';
import React from 'react';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { ProgramDegreeFilter } from '@/features/program/components/ProgramDegreeFilter.tsx';

export function ProgramsTable() {
  const { data } = useProgramList();
  const columns = React.useMemo(() => getProgramsTableColumns(), []);
  const table = useDataTable<Program>({ data, columns });

  return (
    <Stack gap="md">
      <Group grow preventGrowOverflow={false}>
        <DataTableSearch width={800} table={table} placeholder="Search any program..." />
        <ProgramDegreeFilter table={table} />
      </Group>

      <AppCard title="Program List" subtitle={`Manage all university programs`}>
        <DataTable table={table} />
      </AppCard>

      <DataTablePagination table={table} />
    </Stack>
  );
}
