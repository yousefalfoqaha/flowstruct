import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {Course} from "@/features/course/types.ts";
import {getCourseListQuery} from "@/features/course/queries.ts";

export const useStudyPlanCourseList = (studyPlanId: number) => {
    const queryClient = useQueryClient();

    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const cachedCourses: Record<number, Course> | undefined = queryClient.getQueryData(["courses"]);

    if (!cachedCourses) return;

    const courseIds = studyPlan.sections.flatMap(s => s.courses);

    const missingCourses = courseIds.filter(id => cachedCourses[id] === undefined);

    return useSuspenseQuery(getCourseListQuery(missingCourses));
}

