import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/study-plans/$studyPlanId/overview')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/study-plans/$studyPlanId/overview"!</div>
}
