import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_mainLayout/study-plans')({
        loader: () => ({
            crumb: 'Study Plans'
        }),
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/study-plans"!</div>
}
