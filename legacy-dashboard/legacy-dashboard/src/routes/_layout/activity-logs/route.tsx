import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/activity-logs')({
    loader: () => {
        return {
            crumb: 'Activity Logs'
        };
    },
    component: () => <Outlet/>,
});
