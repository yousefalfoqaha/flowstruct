import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppLayout } from '@/shared/components/AppLayout.tsx'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
