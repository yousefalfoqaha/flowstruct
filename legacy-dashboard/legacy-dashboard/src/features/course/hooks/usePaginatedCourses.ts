import {useQuery} from "@tanstack/react-query";
import {getPaginatedCoursesQuery} from "@/features/course/queries.ts";
import {Course} from "@/features/course/types.ts";
import {PaginationState} from "@tanstack/react-table";

export const usePaginatedCourses = (
    shouldSearch: boolean,
    searchQuery: Partial<Pick<Course, "code" | "name">>,
    pagination: PaginationState
) => useQuery(getPaginatedCoursesQuery(shouldSearch, searchQuery, pagination));