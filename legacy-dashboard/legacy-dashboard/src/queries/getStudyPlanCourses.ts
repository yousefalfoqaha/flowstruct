import {queryOptions} from "@tanstack/react-query";
import {Course} from "@/types";

export const getStudyPlanCourses = (
    studyPlanId: number,
    courseIds: number[]
) => queryOptions({
    queryKey: ['study-plan', studyPlanId, 'courses'],
    queryFn: async () => {
        const response = await fetch(`http://localhost:8080/api/v1/courses/by-ids?courseIds=${courseIds}`);
        return await response.json() as Record<number, Course>;
    }
});