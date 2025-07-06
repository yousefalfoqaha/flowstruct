import React from 'react';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  Pill,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { List, Plus, PlusCircle, X } from 'lucide-react';
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
import { CreateCourseModal } from '@/features/course/components/CreateCourseModal';
import { Course } from '@/features/course/types.ts';
import { useStudyPlan } from '@/features/study-plan/hooks/useStudyPlan.ts';

interface CourseRow {
  id: number;
  code: string;
  name: string;
  creditHours: number;
}

type CourseMeta = Pick<CourseRow, 'code' | 'name'>;

export function StudyPlanCourseAdder() {
  const { data: studyPlan } = useStudyPlan();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const DEBOUNCE_MS = 300;
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
      globalFilter: debouncedFilter,
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
    manualFiltering: true,
    pageCount: data?.totalPages ?? 1,
    rowCount: data?.totalCourses,
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
      {
        onSuccess: () => {
          setModalOpen(false);
          setSelectedCourses({});
          setRowSelection({});
          setFilter('');
          setSelectedSection(null);
        },
      }
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

  const noSelection = Object.keys(selectedCourses).length === 0;

  const selectCreatedCourse = (course: Course) => {
    const courseId = String(course.id);

    setRowSelection((prev) => ({
      ...prev,
      [courseId]: true,
    }));

    setSelectedCourses((prev) => ({
      ...prev,
      [courseId]: {
        code: course.code,
        name: course.name,
      },
    }));

    setFilter('');
  };

  return (
    <>
      <CreateCourseModal
        selectCreatedCourse={selectCreatedCourse}
        opened={createModalOpen}
        setOpened={setCreateModalOpen}
        openCourseSearch={() => setModalOpen(true)}
      />
      <Button onClick={() => setModalOpen(true)} leftSection={<Plus size={16} />}>
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
          <Group>
            <DataTableSearch table={table} placeholder="Filter courses..." debounce={DEBOUNCE_MS} />

            <Button
              variant="outline"
              leftSection={<Plus size={16} />}
              onClick={() => {
                setModalOpen(false);
                setCreateModalOpen(true);
              }}
            >
              Create New Course
            </Button>
          </Group>

          <Box pos="relative">
            <LoadingOverlay visible={isFetching} zIndex={1000} loaderProps={{ type: 'bars' }} />
            <DataTable table={table} />
          </Box>

          <DataTablePagination table={table} />
          <Box className={classes.box}>
            <Pill.Group style={{ alignContent: 'start' }}>
              {Object.entries(selectedCourses).map(([id, metadata]) => {
                return (
                  <Pill key={id} withRemoveButton onRemove={() => handleRemoveCourse(id)}>
                    {metadata.code}: {metadata.name}
                  </Pill>
                );
              })}
            </Pill.Group>
            {noSelection && (
              <Group gap="xs" m="auto">
                <PlusCircle color="gray" size={16} />
                <Text c="dimmed" size="sm">
                  Selected courses will appear here
                </Text>
              </Group>
            )}
          </Box>

          <Group>
            <Button
              variant="default"
              leftSection={<X size={16} />}
              disabled={noSelection}
              onClick={() => {
                setRowSelection({});
                setSelectedCourses({});
              }}
            >
              Clear
            </Button>

            <Select
              flex={1}
              leftSection={<List size={16} />}
              placeholder="Select section"
              searchable
              data={sectionOptions}
              value={selectedSection}
              onChange={setSelectedSection}
            />

            <Button
              leftSection={<Plus size={16} />}
              onClick={handleAddCourse}
              loading={addCourses.isPending}
              disabled={!Object.keys(rowSelection).length || !selectedSection}
            >
              Add to Study Plan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
