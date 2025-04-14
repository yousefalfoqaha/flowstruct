import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/study-plans')({
  loader: () => ({
    crumb: 'Study Plans',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/study-plans"!</div>
}
