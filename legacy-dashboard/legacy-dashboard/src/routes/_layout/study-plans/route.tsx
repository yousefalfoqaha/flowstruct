import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/study-plans')({
    loader: () => ({
        crumb: 'Study Plans',
    }),
    component: () => <Outlet/>,
})