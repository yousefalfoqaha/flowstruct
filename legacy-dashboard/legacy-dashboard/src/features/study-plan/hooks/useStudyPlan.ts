import { useSuspenseQuery } from "@tanstack/react-query";
import { getStudyPlanQuery } from "@/features/study-plan/queries.ts";
import { useParams } from "@tanstack/react-router";
import React from "react";

export const useStudyPlan = (fallbackStudyPlanId?: number) => {
    const params = useParams({ strict: false });

    const studyPlanId = React.useMemo(() => {
        const fromParams = params.studyPlanId ? parseInt(params.studyPlanId) : undefined;
        return fromParams || fallbackStudyPlanId;
    }, [params.studyPlanId, fallbackStudyPlanId]);

    if (!studyPlanId) {
        throw new Error("Cannot use study plan without a study plan ID.");
    }

    return useSuspenseQuery(getStudyPlanQuery(studyPlanId));
};
