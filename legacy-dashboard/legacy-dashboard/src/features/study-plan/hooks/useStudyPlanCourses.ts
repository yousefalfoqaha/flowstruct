import {useSuspenseQuery} from "@tanstack/react-query";
import {StudyPlanCourseListQuery} from "@/features/study-plan/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useStudyPlanCourses = (fallbackStudyPlanId?: number) => {
    const studyPlanId = useEntityId('studyPlanId', fallbackStudyPlanId);
    return useSuspenseQuery(StudyPlanCourseListQuery(studyPlanId));
}
