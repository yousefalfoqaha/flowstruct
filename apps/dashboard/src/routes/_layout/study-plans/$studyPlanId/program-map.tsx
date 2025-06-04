import { createFileRoute } from '@tanstack/react-router';
import { ProgramMap } from '@/features/study-plan/components/ProgramMap.tsx';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { ProgramMapProvider } from '@/contexts/ProgramMapContext';

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/program-map')({
  loader: () => ({ crumb: 'Program Map' }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppCard title="Program Map" subtitle="Manage study plan course placements">
      <ProgramMapProvider>
        <ProgramMap />
      </ProgramMapProvider>
    </AppCard>
  );
}
