import {createFileRoute, Navigate} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { studyPlanId } = Route.useParams();
    return (
        <Navigate
            to="/study-plans/$studyPlanId/details"
            params={{studyPlanId}}
        />
    );
}
