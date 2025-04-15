import {createFileRoute, Link} from '@tanstack/react-router'
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {ActionIcon, Button, Group, Stack, Title} from "@mantine/core";
import {ArrowLeft, Pencil} from "lucide-react";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {InfoItem} from "@/shared/components/InfoItem.tsx";
import {Degree} from "@/features/program/types.ts";

export const Route = createFileRoute('/_layout/programs/$programId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {data: program} = useProgram()

  return (
      <Stack>
        <Group justify="space-between">
          <Group>
            <Link to="/programs">
              <ActionIcon size={42} variant="default">
                <ArrowLeft size={18}/>
              </ActionIcon>
            </Link>
            <Title order={2} fw={600}>
              {getProgramDisplayName(program)}
            </Title>
            {getVisibilityBadge(program.isPrivate)}
          </Group>
        </Group>

        <AppCard
            title="Program Information"
            subtitle="Details about this program"
            headerAction={
              <Link
                  to="/programs/$programId/edit"
                  params={{programId: String(program.id)}}
              >
                <Button leftSection={<Pencil size={18}/>} variant="outline">
                  Edit Details
                </Button>
              </Link>
            }
        >
          <Stack gap="lg">
            <Group grow>
              <InfoItem label="Code" value={program.code}/>
              <InfoItem label="Name" value={program.name}/>
            </Group>

            <Group grow>
              <InfoItem
                  label="Degree"
                  value={`${Degree[program.degree as keyof typeof Degree]} (${program.degree})`}
              />
              <InfoItem
                  label="Visibility"
                  value={program.isPrivate ? 'Hidden' : 'Public'}
              />
            </Group>
          </Stack>
        </AppCard>
      </Stack>
  );
}
