import React from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getCourseListQuery} from "@/features/course/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export const useCourseList = () => {
    const {data: studyPlan} = useStudyPlan();

    const courses = React.useMemo(() => {
        return studyPlan.sections.flatMap(section => section.courses);
    }, [studyPlan.sections]);

    return useSuspenseQuery(getCourseListQuery(courses));
};
