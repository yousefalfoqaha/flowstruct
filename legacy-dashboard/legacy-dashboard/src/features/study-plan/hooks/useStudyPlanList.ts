import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {useQuery} from "@tanstack/react-query";

export const useStudyPlanList = () => {
    return useQuery(getStudyPlanListQuery());
}
