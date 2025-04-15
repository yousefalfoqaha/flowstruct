import { createFileRoute } from '@tanstack/react-router'
import {Stack, Title} from "@mantine/core";
import {ProgramsTable} from "@/features/program/components/ProgramsTable.tsx";

export const Route = createFileRoute('/_layout/programs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <Stack>
        <Title order={2} fw={600}>Programs</Title>
        <ProgramsTable/>
      </Stack>
  );
}
