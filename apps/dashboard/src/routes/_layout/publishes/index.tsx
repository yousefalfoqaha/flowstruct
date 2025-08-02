import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Globe } from 'lucide-react';

export const Route = createFileRoute('/_layout/publishes/')({
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
            Publishes
          </Title>
          <Text c="dimmed" size="sm">
            View, create, or retry publish requests
          </Text>
        </div>

        <Link to=".">
          <Button leftSection={<Globe size={18} />}>Publish Changes</Button>
        </Link>
      </Group>
    </Stack>
  );
}
