import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { ProgramsTable } from '@/features/program/components/ProgramsTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Stack, Title } from '@mantine/core';

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
      <Title order={2} fw={600}>
        Programs
      </Title>
      <ProgramsTable />
    </Stack>
  );
}
