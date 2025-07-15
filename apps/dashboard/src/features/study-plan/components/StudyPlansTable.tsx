import { DataTable } from '@/shared/components/DataTable.tsx';
import { useStudyPlanList } from '@/features/study-plan/hooks/useStudyPlanList.ts';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { StudyPlanRow } from '@/features/study-plan/types.ts';
import React from 'react';
import { getStudyPlansTableColumns } from '@/features/study-plan/components/StudyPlansTableColumns.tsx';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { Button, Group, Stack } from '@mantine/core';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { getProgramDisplayName } from '@/utils/getProgramDisplayName.ts';
import { StudyPlanYearFilter } from '@/features/study-plan/components/StudyPlanYearFilter.tsx';
import { ColumnFilterSelect } from '@/shared/components/ColumnFilterSelect.tsx';
import { GraduationCap, Plus } from 'lucide-react';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { Link } from '@tanstack/react-router';
import { getStudyPlanRows } from '@/utils/getStudyPlanRows.ts';

export function StudyPlansTable() {
  const { data: studyPlans } = useStudyPlanList();
  const { data: programs } = useProgramList();

  const columns = React.useMemo(() => getStudyPlansTableColumns(), []);
  const data: StudyPlanRow[] = getStudyPlanRows(studyPlans, programs);
  const table = useDataTable<StudyPlanRow>({ data, columns });

  return (
    <Stack>
      <Group>
        <DataTableSearch width={800} table={table} placeholder="Search any study plan..." />

        <ColumnFilterSelect
          table={table}
          columnId="programName"
          data={programs.map((p) => getProgramDisplayName(p))}
          leftSection={<GraduationCap size={16} />}
          placeholder="Filter by program..."
        />

        <StudyPlanYearFilter table={table} />
      </Group>

      <AppCard
        title="Study Plan List"
        subtitle="Manage all university study plans"
        headerAction={
          <Link to="/study-plans/new">
            <Button leftSection={<Plus size={18} />}>Create New Study Plan</Button>
          </Link>
        }
      >
        <DataTable table={table} />
      </AppCard>

      <DataTablePagination table={table} />
    </Stack>
  );
}
