import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/study-plans/$studyPlanId/program-map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/study-plans/$studyPlanId/program-map"!</div>
}
