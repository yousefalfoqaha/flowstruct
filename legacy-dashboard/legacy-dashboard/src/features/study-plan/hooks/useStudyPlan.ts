import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useParams} from "@tanstack/react-router";

export const useStudyPlan = () => {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    if (!studyPlanId) {
        throw new Error("Cannot use study plan without a study plan ID search parameter.");
    }

    return useSuspenseQuery(getStudyPlanQuery(studyPlanId));
}
