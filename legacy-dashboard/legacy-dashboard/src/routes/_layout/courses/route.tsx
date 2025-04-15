import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/courses')({
    loader: () => ({
        crumb: 'Courses',
    }),
    component: () => <Outlet/>,
});