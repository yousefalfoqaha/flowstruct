import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/users"!</div>
}
