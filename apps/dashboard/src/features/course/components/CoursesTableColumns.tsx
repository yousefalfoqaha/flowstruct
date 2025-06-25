import { createColumnHelper } from '@tanstack/react-table';
import { CourseSummary } from '@/features/course/types.ts';
import { Badge } from '@mantine/core';
import { CourseOptionsMenu } from '@/features/course/components/CourseOptionsMenu.tsx';
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts';

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
      header: 'Credits',
      cell: ({ cell }) => `${cell.getValue()} Cr.`,
    }),
    accessor('type', {
      header: 'Type',
    }),
    accessor('updatedAt', {
      header: 'Last Updated',
      cell: ({ row }) => formatTimeAgo(new Date(row.original.updatedAt)),
    }),
    display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <CourseOptionsMenu course={row.original} />,
    }),
  ];
}
