import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { ProgramsTable } from '@/features/program/components/ProgramsTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Button, Group, Stack, Title } from '@mantine/core';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/_layout/programs/')({
  component: RouteComponent,
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues())],
  },
});

function RouteComponent() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2} fw={600}>
          Programs
        </Title>
        <Link to="/programs/new">
          <Button leftSection={<Plus size={18} />}>Create New Program</Button>
        </Link>
      </Group>
      <ProgramsTable />
    </Stack>
  );
}
