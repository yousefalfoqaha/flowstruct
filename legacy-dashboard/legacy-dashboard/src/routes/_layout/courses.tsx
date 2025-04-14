import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/courses')({
  loader: () => ({
    crumb: 'Courses',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/courses"!</div>
}
