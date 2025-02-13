import {queryOptions} from "@tanstack/react-query";
import {StudyPlan} from "@/types";

export const getStudyPlan = (studyPlanId: number) => queryOptions({
    queryKey: ['study-plan', studyPlanId],
    queryFn: async () => {
        const res = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}`);
        return await res.json() as StudyPlan;
    }
});
