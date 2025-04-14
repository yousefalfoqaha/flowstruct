import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getProgramListQuery} from '@/features/program/queries.ts'

export const Route = createFileRoute('/_layout/programs')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getProgramListQuery)
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Outlet />
  )
}
