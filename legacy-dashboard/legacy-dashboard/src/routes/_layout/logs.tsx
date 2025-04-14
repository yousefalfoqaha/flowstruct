import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/logs"!</div>
}
