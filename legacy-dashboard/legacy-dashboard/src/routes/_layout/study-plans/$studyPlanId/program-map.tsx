import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/study-plans/$studyPlanId/program-map',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/study-plans/$studyPlanId/program-map"!</div>
}
