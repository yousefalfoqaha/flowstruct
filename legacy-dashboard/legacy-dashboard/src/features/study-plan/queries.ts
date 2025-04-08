import {queryOptions} from "@tanstack/react-query";
import {getStudyPlanList, getStudyPlan} from "@/features/study-plan/api.ts";

export const studyPlanKeys = {
    all: ['study-plans'] as const,
    lists: () => [...studyPlanKeys.all, 'list'] as const,
    list: (programId: number) => [...studyPlanKeys.lists(), programId] as const,
    details: () => [...studyPlanKeys.all, 'detail'] as const,
    detail: (id: number) => [...studyPlanKeys.details(), id] as const,
};

export const getStudyPlanListQuery = (programId: number) => queryOptions({
    queryKey: studyPlanKeys.list(programId),
    queryFn: () => getStudyPlanList(programId),
    enabled: !!programId
});

export const getStudyPlanQuery = (studyPlanId: number) => queryOptions({
    queryKey: studyPlanKeys.detail(studyPlanId),
    queryFn: () => getStudyPlan(studyPlanId)
});
