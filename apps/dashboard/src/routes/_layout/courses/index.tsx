import {
  createFileRoute,
  Link,
  retainSearchParams,
  stripSearchParams,
} from '@tanstack/react-router';
import { CoursesTable } from '@/features/course/components/CoursesTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { PaginatedCourseListQuery } from '@/features/course/queries.ts';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Plus } from 'lucide-react';

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
      <Group justify="space-between">
        <div>
          <Title lh="md" order={2} fw={600}>
            Courses
          </Title>
          <Text c="dimmed" size="sm">
            Manage all university courses
          </Text>
        </div>

        <Link to="/courses/new">
          <Button leftSection={<Plus size={18} />}>Create New Course</Button>
        </Link>
      </Group>

      <CoursesTable />
    </Stack>
  );
}
