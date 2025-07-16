import { useStudyPlan } from '@/features/study-plan/hooks/useStudyPlan.ts';
import { createColumnHelper } from '@tanstack/react-table';
import { Section, SectionLevel, SectionType } from '@/features/study-plan/types.ts';
import React from 'react';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { getSectionCode } from '@/utils/getSectionCode.ts';
import { Badge, Button, Group, Stack } from '@mantine/core';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { ColumnFilterSelect } from '@/shared/components/ColumnFilterSelect.tsx';
import { Plus, Tag, University } from 'lucide-react';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { SectionOptionsMenu } from '@/features/study-plan/components/SectionOptionsMenu.tsx';
import { MoveSectionMenu } from '@/features/study-plan/components/MoveSectionMenu.tsx';
import { Link } from '@tanstack/react-router';

export function SectionsTable() {
  const { data: studyPlan } = useStudyPlan();

  const { accessor, display } = createColumnHelper<Section>();

  const columns = React.useMemo(
    () => [
      display({
        id: 'code',
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
        header: 'Required Cr.',
        cell: ({ row }) => `${row.original.requiredCreditHours} Cr.`,
      }),
      accessor('name', {
        header: 'Name',
        cell: ({ row }) => (row.original.name !== '' ? row.original.name : '---'),
      }),
      display({
        header: 'Courses',
        cell: ({ row }) => `${row.original.courses.length}`,
      }),
      display({
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const canMove = row.original.position !== 0;
          return (
            <Group justify="end" gap={0}>
              {canMove && <MoveSectionMenu section={row.original} />}
              <SectionOptionsMenu section={row.original} />
            </Group>
          );
        },
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
        <ColumnFilterSelect
          table={table}
          columnId="level"
          data={Object.values(SectionLevel).map((value) => ({
            label: value,
            value: value,
          }))}
          leftSection={<University size={16} />}
          placeholder="Filter by level..."
        />

        <ColumnFilterSelect
          table={table}
          columnId="type"
          data={Object.values(SectionType).map((value) => ({
            label: value,
            value: value,
          }))}
          leftSection={<Tag size={16} />}
          placeholder="Filter by type..."
        />

        <Link
          params={{ studyPlanId: String(studyPlan.id) }}
          to="/study-plans/$studyPlanId/sections/new"
        >
          <Button leftSection={<Plus size={18} />}>Create New Section</Button>
        </Link>
      </Group>

      <DataTable table={table} />

      <DataTablePagination table={table} />
    </Stack>
  );
}
