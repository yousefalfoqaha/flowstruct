import {useInfiniteQuery} from "@tanstack/react-query";
import {getPaginatedCoursesQuery} from "@/features/course/queries.ts";

export const usePaginatedCourses = (search: string) =>
    useInfiniteQuery(getPaginatedCoursesQuery(search));