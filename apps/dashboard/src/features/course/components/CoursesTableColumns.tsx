import { createColumnHelper } from '@tanstack/react-table';
import { CourseSummary } from '@/features/course/types.ts';
import { Badge } from '@mantine/core';
import { CourseOptionsMenu } from '@/features/course/components/CourseOptionsMenu.tsx';
import { LastUpdatedStats } from '@/shared/components/LastUpdatedStats.tsx';

export function getCoursesTableColumns() {
  const { accessor, display } = createColumnHelper<CourseSummary>();

  return [
    accessor('code', {
      header: 'Code',
      cell: ({ cell }) => <Badge variant="default">{cell.getValue()}</Badge>,
    }),
    accessor('name', {
      header: 'Name',
    }),
    accessor('creditHours', {
      header: 'Cr.',
      cell: ({ cell }) => `${cell.getValue()} Cr.`,
    }),
    accessor('type', {
      header: 'Type',
    }),
    display({
      id: 'last-updated',
      header: 'Last Updated',
      cell: ({ row }) => (
        <LastUpdatedStats at={row.original.updatedAt} by={row.original.updatedBy} />
      ),
    }),
    display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <CourseOptionsMenu course={row.original} />,
    }),
  ];
}
