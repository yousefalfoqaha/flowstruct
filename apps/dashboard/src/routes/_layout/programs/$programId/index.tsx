import { createFileRoute } from '@tanstack/react-router';
import { useProgram } from '@/features/program/hooks/useProgram.ts';
import { Group } from '@mantine/core';
import { getProgramDisplayName } from '@/utils/getProgramDisplayName.ts';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { InfoItem } from '@/shared/components/InfoItem.tsx';
import { Degree } from '@/features/program/types.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { PageLayout } from '@/shared/components/PageLayout.tsx';
import { PageHeaderWithBack } from '@/shared/components/PageHeaderWithBack.tsx';
import { EditDetailsButton } from '@/shared/components/EditDetailsButton.tsx';
import { LastUpdated } from '@/shared/components/LastUpdated.tsx';

export const Route = createFileRoute('/_layout/programs/$programId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: program } = useProgram();

  return (
    <PageLayout
      header={
        <Group gap="lg" justify="space-between">
          <PageHeaderWithBack
            title={getProgramDisplayName(program)}
            linkProps={{
              to: '/programs',
              search: DefaultSearchValues(),
            }}
          />
          <Group gap="lg">
            <LastUpdated at={program.updatedAt} by={program.updatedBy} />
            <EditDetailsButton
              to="/programs/$programId/edit"
              params={{ programId: String(program.id) }}
            />
          </Group>
        </Group>
      }
    >
      <AppCard title="Program Information" subtitle="Details about this program">
        <Group grow>
          <InfoItem label="Code" value={program.code} />
          <InfoItem label="Name" value={program.name} />
        </Group>

        <Group grow>
          <InfoItem
            label="Degree"
            value={`${Degree[program.degree as keyof typeof Degree]} (${program.degree})`}
          />
        </Group>
      </AppCard>
    </PageLayout>
  );
}
