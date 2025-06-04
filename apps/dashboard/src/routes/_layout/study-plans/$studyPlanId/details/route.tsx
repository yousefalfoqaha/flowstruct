import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_layout/study-plans/$studyPlanId/details',
)({
    loader: () => ({crumb: 'Details'}),
    component: () => <Outlet/>,
});
