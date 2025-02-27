import {useQuery} from "@tanstack/react-query";
import {getPaginatedCoursesQuery} from "@/features/course/queries.ts";
import {PaginationState} from "@tanstack/react-table";

export const usePaginatedCourses = (
    shouldSearch: boolean,
    searchQuery: string,
    pagination: PaginationState
) => useQuery(getPaginatedCoursesQuery(shouldSearch, searchQuery, pagination));