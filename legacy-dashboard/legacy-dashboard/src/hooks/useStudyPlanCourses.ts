import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlanCourses} from "@/queries/getStudyPlanCourses.ts";

export const useStudyPlanCourses = (studyPlanId: number) => {
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const courseIds = studyPlan.sections.flatMap(section => section.courses);

    return useSuspenseQuery(getStudyPlanCourses(studyPlanId, courseIds));
}