import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCourseListQuery } from "@/features/course/queries.ts";
import { useStudyPlan } from "@/features/study-plan/hooks/useStudyPlan.ts";

export const useCourseList = (studyPlanId: number) => {
    const { data: studyPlan } = useStudyPlan(studyPlanId);

    // Memoize the list of course IDs from the study plan so that the courses array is stable
    const courses = React.useMemo(() => {
        return studyPlan.sections.flatMap(s => s.courses);
    }, [studyPlan]);

    // The query key now includes the courses list to help React Query cache the result properly.
    return useSuspenseQuery(getCourseListQuery(courses));
};
