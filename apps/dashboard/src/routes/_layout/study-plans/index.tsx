import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { StudyPlansTable } from '@/features/study-plan/components/StudyPlansTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Button, Group, Stack, Title } from '@mantine/core';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/_layout/study-plans/')({
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
          Study Plans
        </Title>
        <Link to="/study-plans/new">
          <Button leftSection={<Plus size={18} />}>Create New Study Plan</Button>
        </Link>
      </Group>
      <StudyPlansTable />
    </Stack>
  );
}
