import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses"!</div>
}
