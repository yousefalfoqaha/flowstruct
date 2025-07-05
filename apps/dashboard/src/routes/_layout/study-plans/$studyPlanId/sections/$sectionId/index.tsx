import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/sections/$sectionId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { studyPlanId, sectionId } = Route.useParams();

  return (
    <Navigate
      to="/study-plans/$studyPlanId/sections/$sectionId/edit"
      params={{ studyPlanId, sectionId }}
    />
  );
}
