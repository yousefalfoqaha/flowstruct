import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useStudyPlan = (fallbackStudyPlanId?: number) => {
    const studyPlanId = useEntityId('studyPlanId', fallbackStudyPlanId);
    return useSuspenseQuery(getStudyPlanQuery(studyPlanId));
};
