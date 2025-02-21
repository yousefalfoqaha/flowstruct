import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";

export const useStudyPlan = (studyPlanId: number) => {
    return useSuspenseQuery(getStudyPlanQuery(studyPlanId));
}
