import {useSuspenseQuery} from "@tanstack/react-query";
import {StudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useStudyPlan = (fallbackStudyPlanId?: number) => {
    const studyPlanId = useEntityId('studyPlanId', fallbackStudyPlanId);
    return useSuspenseQuery(StudyPlanQuery(studyPlanId));
};
