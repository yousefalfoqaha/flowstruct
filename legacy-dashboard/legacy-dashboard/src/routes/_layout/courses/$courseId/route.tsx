import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/courses/$courseId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/courses/$courseId"!</div>
}
