import {useSuspenseQuery} from "@tanstack/react-query";
import {StudyPlanCourseListQuery} from "@/features/study-plan/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useStudyPlanCourses = (fallbackStudyPlanId?: number) => {
    const studyPlanId = useEntityId({paramKey: 'studyPlanId', fallback: fallbackStudyPlanId});
    return useSuspenseQuery(StudyPlanCourseListQuery(studyPlanId));
};
