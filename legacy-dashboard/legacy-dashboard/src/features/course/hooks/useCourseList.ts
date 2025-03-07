import React from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getCourseListQuery} from "@/features/course/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export const useCourseList = (studyPlanId: number) => {
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const courses = React.useMemo(() => {
        return studyPlan.sections.flatMap(s => Object.keys(s.courses).map(Number));
    }, [studyPlan]);

    return useSuspenseQuery(getCourseListQuery(courses));
};
