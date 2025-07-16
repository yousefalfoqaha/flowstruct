import { usePaginatedCourseList } from '@/features/course/hooks/usePaginatedCourseList.ts';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { CourseSummary } from '@/features/course/types.ts';
import React from 'react';
import { getCoursesTableColumns } from '@/features/course/components/CoursesTableColumns.tsx';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { LoadingOverlay, Stack } from '@mantine/core';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { useSearch } from '@tanstack/react-router';

export function CoursesTable() {
  const columns = React.useMemo(() => getCoursesTableColumns(), []);

  const search = useSearch({ from: '/_layout/courses/' });
  const { data: coursesPage, isPending } = usePaginatedCourseList(search);

  const data: CourseSummary[] = React.useMemo(
    () => coursesPage?.content ?? [],
    [coursesPage?.content]
  );

  const table = useDataTable<CourseSummary>({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: coursesPage?.totalPages,
    rowCount: coursesPage?.totalCourses,
  });

  return (
    <Stack>
      <DataTableSearch width="" placeholder="Search any course..." table={table} debounce={750} />

      <LoadingOverlay visible={isPending} zIndex={1000} loaderProps={{ type: 'bars' }} />

      <DataTable table={table} />

      <DataTablePagination table={table} />
    </Stack>
  );
}
