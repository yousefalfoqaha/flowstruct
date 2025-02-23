import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {useQuery} from "@tanstack/react-query";

export const useStudyPlanList = (programId: number) => {
    return useQuery(getStudyPlanListQuery(programId));
}
