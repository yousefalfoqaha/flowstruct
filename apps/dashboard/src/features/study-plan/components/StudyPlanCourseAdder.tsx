import React from 'react';
import { Button, Checkbox, Group, Loader, Modal, Select, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Plus } from 'lucide-react';
import { StudyPlan } from '@/features/study-plan/types.ts';
import { useAddCoursesToStudyPlan } from '@/features/study-plan/hooks/useAddCoursesToStudyPlan.ts';
import { useInfiniteCourses } from '@/features/course/hooks/useInfiniteCourses.ts';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { getSectionCode } from '@/utils/getSectionCode.ts';
import { getSectionDisplayName } from '@/utils/getSectionDisplayName.ts';

interface StudyPlanCourseAdderProps {
  studyPlan: StudyPlan;
}

interface CourseRow {
  id: number;
  code: string;
  name: string;
  creditHours: number;
}

export function StudyPlanCourseAdder({ studyPlan }: StudyPlanCourseAdderProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [searchValue, setSearchValue] = React.useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);

  const addCourses = useAddCoursesToStudyPlan();
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteCourses(debouncedSearch);

  const rows: CourseRow[] = React.useMemo(() => {
    const list = data?.pages.flatMap((p) => p.content) ?? [];
    return list.map((course) => ({
      id: course.id,
      code: course.code,
      name: course.name,
      creditHours: course.creditHours,
    }));
  }, [data]);

  const columnHelper = createColumnHelper<CourseRow>();
  const columns = React.useMemo<ColumnDef<CourseRow>[]>(
    () => [
      columnHelper.display({
        id: 'selection',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor('code', { header: 'Code' }) as ColumnDef<CourseRow>,
      columnHelper.accessor('name', { header: 'Name' }) as ColumnDef<CourseRow>,
      columnHelper.accessor('creditHours', { header: 'Credits' }) as ColumnDef<CourseRow>,
    ],
    [selectedRows]
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable<CourseRow>({
    data: rows,
    columns,
    state: {
      globalFilter: searchValue,
      columnFilters,
      pagination,
    },
    onGlobalFilterChange: (value) => setSearchValue(value),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: data?.pages[0]?.totalPages ?? 1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAdd = () => {
    if (!selectedSection) return;
    addCourses.mutate(
      {
        studyPlanId: studyPlan.id,
        sectionId: Number(selectedSection),
        courseIds: Array.from(selectedRows),
      },
      { onSuccess: () => setModalOpen(false) }
    );
  };

  const sectionOptions = React.useMemo(
    () =>
      studyPlan.sections.map((s) => ({
        value: s.id.toString(),
        label: getSectionDisplayName(s),
      })),
    [studyPlan]
  );

  return (
    <>
      <Button onClick={() => setModalOpen(true)} leftSection={<Plus />}>
        Add Courses
      </Button>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Courses to Study Plan"
        size="auto"
        centered
      >
        <Stack>
          <Group>
            <DataTableSearch
              table={table}
              placeholder="Filter courses..."
              width={300}
              debounce={300}
            />

            <Select
              placeholder="Select section"
              data={sectionOptions}
              value={selectedSection}
              onChange={setSelectedSection}
            />

            <Button
              leftSection={<Plus />}
              onClick={handleAdd}
              loading={addCourses.isPending}
              disabled={selectedRows.size === 0 || !selectedSection}
            >
              Add to Plan
            </Button>
          </Group>

          <DataTable table={table} />
          <DataTablePagination table={table} />
        </Stack>

        {isFetching && <Loader />}
      </Modal>
    </>
  );
}
