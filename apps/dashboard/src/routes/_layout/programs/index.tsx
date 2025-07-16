import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { ProgramsTable } from '@/features/program/components/ProgramsTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Plus } from 'lucide-react';
import React from 'react';

export const Route = createFileRoute('/_layout/programs/')({
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues())],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title lh="md" order={2} fw={600}>
            Programs
          </Title>
          <Text c="dimmed" size="sm">
            Manage all university programs
          </Text>
        </div>

        <Link to="/programs/new">
          <Button leftSection={<Plus size={18} />}>Create New Program</Button>
        </Link>
      </Group>

      <ProgramsTable />
    </Stack>
  );
}
