import { useStudyPlan } from '@/features/study-plan/hooks/useStudyPlan.ts';
import { createColumnHelper } from '@tanstack/react-table';
import { Section, SectionLevel, SectionType } from '@/features/study-plan/types.ts';
import React from 'react';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { getSectionCode } from '@/utils/getSectionCode.ts';
import { Badge, Button, Group, Stack } from '@mantine/core';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { ColumnFilterSelect } from '@/shared/components/ColumnFilterSelect.tsx';
import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';

export function SectionsTable() {
  const { data: studyPlan } = useStudyPlan();

  const { accessor, display } = createColumnHelper<Section>();

  const columns = React.useMemo(
    () => [
      display({
        header: 'Code',
        cell: ({ row }) => <Badge variant="default">{getSectionCode(row.original)}</Badge>,
      }),
      accessor('level', {
        header: 'Level',
        filterFn: 'equalsString',
        enableColumnFilter: true,
      }),
      accessor('type', {
        header: 'Type',
      }),
      accessor('requiredCreditHours', {
        header: 'Required Credits',
        cell: ({ row }) => `${row.original.requiredCreditHours} Cr.`,
      }),
      accessor('name', {
        header: 'Name',
        cell: ({ row }) => (row.original.name ? row.original.name : '---'),
      }),
      display({
        header: 'Courses',
        cell: ({ row }) => `${row.original.courses.length}`,
      }),
    ],
    []
  );

  const table = useDataTable<Section>({
    data: studyPlan.sections,
    columns,
  });

  return (
    <Stack>
      <Group>
        <DataTableSearch placeholder="Search sections..." table={table} />
        <ColumnFilterSelect<Section>
          table={table}
          columnId="level"
          options={Object.values(SectionLevel).map((value) => ({
            label: value,
            value: value,
          }))}
          placeholder="Filter by level..."
        />

        <ColumnFilterSelect<Section>
          table={table}
          columnId="type"
          options={Object.values(SectionType).map((value) => ({
            label: value,
            value: value,
          }))}
          placeholder="Filter by type..."
        />
      </Group>

      <AppCard
        title="Section List"
        subtitle="Manage all study plan sections"
        headerAction={
          <Link
            params={{ studyPlanId: String(studyPlan.id) }}
            to="/study-plans/$studyPlanId/sections/new"
          >
            <Button leftSection={<Plus size={18} />}>Create New Section</Button>
          </Link>
        }
      >
        <DataTable table={table} />
      </AppCard>
      <DataTablePagination table={table} />
    </Stack>
  );
}
