import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_mainLayout/courses')({
    loader: () => ({
        crumb: 'Courses'
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/courses"!</div>
}
