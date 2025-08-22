import {InfiniteCoursesQuery} from "@/features/course/queries.ts";
import {useInfiniteQuery} from "@tanstack/react-query";

export const useInfiniteCourses = (filter: string) => {
    return useInfiniteQuery(InfiniteCoursesQuery(filter));
}
