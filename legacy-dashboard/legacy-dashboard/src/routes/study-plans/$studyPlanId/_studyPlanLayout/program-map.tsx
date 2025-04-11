import { createFileRoute } from '@tanstack/react-router'
import { ProgramMap } from '@/features/study-plan/components/ProgramMap.tsx'
import { Stack, Title } from '@mantine/core'

export const Route = createFileRoute(
  '/study-plans/$studyPlanId/_studyPlanLayout/program-map',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack gap="lg">
      <Title fw={600}>Program Map</Title>
      <ProgramMap />
    </Stack>
  )
}
