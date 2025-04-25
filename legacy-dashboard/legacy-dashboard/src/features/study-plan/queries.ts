import {queryOptions} from "@tanstack/react-query";
import {getStudyPlan, getStudyPlanCourses, getStudyPlanList} from "@/features/study-plan/api.ts";

export const studyPlanKeys = {
    all: ['study-plans'] as const,
    list: () => [...studyPlanKeys.all, 'list'] as const,
    details: () => [...studyPlanKeys.all, 'detail'] as const,
    detail: (id: number) => [...studyPlanKeys.details(), id] as const,
    courseList: (studyPlanId: number) => [...studyPlanKeys.detail(studyPlanId), 'courses'] as const,
};

export const StudyPlanListQuery = queryOptions({
    queryKey: studyPlanKeys.list(),
    queryFn: () => getStudyPlanList()
});

export const StudyPlanQuery = (studyPlanId: number) => queryOptions({
    queryKey: studyPlanKeys.detail(studyPlanId),
    queryFn: () => getStudyPlan(studyPlanId)
});

export const StudyPlanCourseListQuery = (studyPlanId: number) => queryOptions({
    queryKey: studyPlanKeys.courseList(studyPlanId),
    queryFn: () => getStudyPlanCourses(studyPlanId),
    enabled: !!studyPlanId
});
