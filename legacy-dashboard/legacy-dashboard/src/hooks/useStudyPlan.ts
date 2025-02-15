import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";

export const useStudyPlan = (studyPlanId: number) => {
    return useSuspenseQuery(getStudyPlan(studyPlanId));
};
