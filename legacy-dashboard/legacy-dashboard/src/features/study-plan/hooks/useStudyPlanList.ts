import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {useSuspenseQuery} from "@tanstack/react-query";

export const useStudyPlanList = () => {
    return useSuspenseQuery(getStudyPlanListQuery());
}
