import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/dashboard"!</div>
}
