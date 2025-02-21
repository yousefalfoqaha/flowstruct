import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getCourseListQuery} from "@/features/course/queries.ts";
import {Course} from "@/features/course/types.ts";

export const useCourseList = (courseIds: number[]) => {
    const queryClient = useQueryClient();

    const coursesCache = queryClient.getQueryData<Record<number, Course>>(["courses"]);

    const missingCourseIds = courseIds.reduce<number[]>((acc, courseId) => {
        if (!coursesCache || !coursesCache[courseId]) {
            acc.push(courseId);
        }
        return acc;
    }, []);

    return useQuery(getCourseListQuery(missingCourseIds));
}
