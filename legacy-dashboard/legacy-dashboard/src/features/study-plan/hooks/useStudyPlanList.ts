import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";

export const useStudyPlanList = (programId: number) => {
    return useSuspenseQuery(getStudyPlanListQuery(programId));
}
