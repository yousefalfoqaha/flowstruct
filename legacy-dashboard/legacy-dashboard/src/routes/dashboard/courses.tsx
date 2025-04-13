import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/courses')({
  loader: () => ({
    crumb: 'Courses',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses"!</div>
}
