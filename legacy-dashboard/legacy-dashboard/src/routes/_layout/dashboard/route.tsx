import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard')({
    loader: () => {
        return {
            crumb: 'Dashboard'
        };
    },
    component: () => <Outlet/>,
});
