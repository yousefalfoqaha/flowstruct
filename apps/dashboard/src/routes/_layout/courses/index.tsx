import { createFileRoute, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import { CoursesTable } from '@/features/course/components/CoursesTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { PaginatedCourseListQuery } from '@/features/course/queries.ts';
import { Stack, Title } from '@mantine/core';

export const Route = createFileRoute('/_layout/courses/')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(PaginatedCourseListQuery(DefaultSearchValues()));
  },
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues()), retainSearchParams(['page', 'size'])],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack gap="lg">
      <Title order={2} fw={600}>
        Courses
      </Title>
      <CoursesTable />
    </Stack>
  );
}
