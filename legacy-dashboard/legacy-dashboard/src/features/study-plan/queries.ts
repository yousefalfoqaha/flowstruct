import {queryOptions} from "@tanstack/react-query";
import {getStudyPlan, getStudyPlanCourseList, getStudyPlanList} from "@/features/study-plan/api.ts";

export const studyPlanKeys = {
    all: ['study-plans'] as const,
    list: () => [...studyPlanKeys.all, 'list'] as const,
    details: () => [...studyPlanKeys.all, 'detail'] as const,
    detail: (id: number) => [...studyPlanKeys.details(), id] as const,
    courseLists: () => [...studyPlanKeys.all, 'courses'] as const,
    courseList: (studyPlanId: number) => [...studyPlanKeys.courseLists(), studyPlanId] as const,
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
    queryFn: () => getStudyPlanCourseList(studyPlanId),
    enabled: !!studyPlanId
});
