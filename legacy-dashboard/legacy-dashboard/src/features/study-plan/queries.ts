import {queryOptions} from "@tanstack/react-query";
import {getStudyPlanListRequest, getStudyPlanRequest} from "@/features/study-plan/api.ts";

export const getStudyPlanListQuery = (programId: number) => queryOptions({
    queryKey: ["study-plans", "list", programId],
    queryFn: () => getStudyPlanListRequest(programId),
    enabled: !!programId
});

export const getStudyPlanQuery = (studyPlanId: number) => queryOptions({
    queryKey: ["study-plan", "detail", studyPlanId],
    queryFn: () => getStudyPlanRequest(studyPlanId)
});