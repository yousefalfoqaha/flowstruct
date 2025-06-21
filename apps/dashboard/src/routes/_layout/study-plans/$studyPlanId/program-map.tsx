import { createFileRoute } from '@tanstack/react-router';
import { ProgramMap } from '@/features/study-plan/components/ProgramMap.tsx';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { ProgramMapProvider } from '@/contexts/ProgramMapContext';
import { Group, Kbd, Text } from '@mantine/core';
import { ArrowLeftRight } from 'lucide-react';

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/program-map')({
  loader: () => ({ crumb: 'Program Map' }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppCard
      title="Program Map"
      subtitle="Manage study plan course placements"
      headerAction={
        <Group gap="xs">
          <Text c="dimmed" size="xs">Move <span style={{padding: "0.2rem"}} ><ArrowLeftRight size={12} color="gray" /></span> with</Text>
          <Group gap={5}>
            <Kbd size="xs">Shift</Kbd> <Text c="dimmed" size="xs">+</Text> <Kbd size="xs">Scroll</Kbd>
          </Group>
        </Group>
      }
    >
      <ProgramMapProvider>
        <ProgramMap />
      </ProgramMapProvider>
    </AppCard>
  );
}
