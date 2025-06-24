import React from 'react';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Group,
  Loader,
  Modal,
  Pill,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Plus } from 'lucide-react';
import { StudyPlan } from '@/features/study-plan/types.ts';
import { useAddCoursesToStudyPlan } from '@/features/study-plan/hooks/useAddCoursesToStudyPlan.ts';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { getSectionDisplayName } from '@/utils/getSectionDisplayName.ts';
import { usePaginatedCourseList } from '@/features/course/hooks/usePaginatedCourseList.ts';
import classes from '@/features/study-plan/components/StudyPlanCourseAdder.module.css';
import { useCoursesGraph } from '@/contexts/CoursesGraphContext.tsx';

interface StudyPlanCourseAdderProps {
  studyPlan: StudyPlan;
}

interface CourseRow {
  id: number;
  code: string;
  name: string;
  creditHours: number;
}

type CourseMeta = Pick<CourseRow, 'code' | 'name'>;

export function StudyPlanCourseAdder({ studyPlan }: StudyPlanCourseAdderProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const DEBOUNCE_MS = 500;
  const [filter, setFilter] = React.useState('');
  const [debouncedFilter] = useDebouncedValue(filter, DEBOUNCE_MS);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedCourses, setSelectedCourses] = React.useState<Record<string, CourseMeta>>({});
  const { coursesGraph } = useCoursesGraph();
  const addCourses = useAddCoursesToStudyPlan();

  const { data, isFetching } = usePaginatedCourseList({
    filter: debouncedFilter,
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

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
            checked={row.getIsSelected() || coursesGraph.has(row.original.id)}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor('code', {
        header: 'Code',
        cell: ({ row }) => <Badge variant="default">{row.original.code}</Badge>,
      }) as ColumnDef<CourseRow>,
      columnHelper.accessor('name', { header: 'Name' }) as ColumnDef<CourseRow>,
      columnHelper.accessor('creditHours', { header: 'Credits' }) as ColumnDef<CourseRow>,
    ],
    []
  );

  const table = useReactTable<CourseRow>({
    data: data?.content ?? [],
    columns,
    state: {
      globalFilter: filter,
      pagination,
      rowSelection: rowSelection,
    },
    enableRowSelection: (row) => !coursesGraph.has(row.original.id),
    getRowId: (row) => String(row.id),
    onRowSelectionChange: (updaterOrValue) => {
      setRowSelection((prevSel) => {
        const newSel =
          typeof updaterOrValue === 'function' ? updaterOrValue(prevSel) : updaterOrValue;

        setSelectedCourses((prevMap) => {
          const nextMap: Record<string, CourseMeta> = Object.fromEntries(
            Object.entries(prevMap).filter(([id]) => newSel[id])
          );
          data?.content.forEach((c) => {
            const key = String(c.id);
            if (newSel[key] && !nextMap[key]) {
              nextMap[key] = { code: c.code, name: c.name };
            }
          });
          return nextMap;
        });

        return newSel;
      });
    },
    onGlobalFilterChange: setFilter,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: data?.totalPages ?? 1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAddCourse = () => {
    if (!selectedSection) return;
    addCourses.mutate(
      {
        studyPlanId: studyPlan.id,
        sectionId: Number(selectedSection),
        courseIds: Object.keys(rowSelection).map(Number),
      },
      { onSuccess: () => setModalOpen(false) }
    );
  };

  const handleRemoveCourse = (id: string) => {
    table.setRowSelection((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
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
        size="xl"
        centered
      >
        <Stack>
          <Group grow preventGrowOverflow={false}>
            <DataTableSearch
              table={table}
              placeholder="Filter courses..."
              width={150}
              debounce={DEBOUNCE_MS}
            />

            <Select
              placeholder="Select section"
              data={sectionOptions}
              value={selectedSection}
              onChange={setSelectedSection}
            />

            <Button
              leftSection={<Plus />}
              onClick={handleAddCourse}
              loading={addCourses.isPending}
              disabled={!Object.keys(rowSelection).length || !selectedSection}
            >
              Add
            </Button>
          </Group>

          <Box className={classes.box}>
            <Pill.Group>
              {Object.entries(selectedCourses).map(([id, metadata]) => {
                return (
                  <Pill withRemoveButton onRemove={() => handleRemoveCourse(id)}>
                    {metadata.code}: {metadata.name}
                  </Pill>
                );
              })}
            </Pill.Group>
            {Object.keys(selectedCourses).length === 0 && (
              <Text c="dimmed" my="30" size="sm">
                Selected courses will appear here
              </Text>
            )}
          </Box>

          <DataTable table={table} />
          <DataTablePagination table={table} />
        </Stack>

        {isFetching && <Loader />}
      </Modal>
    </>
  );
}
