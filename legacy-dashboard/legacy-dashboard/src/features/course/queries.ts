import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {getCoursesRequest} from "@/features/course/api.ts";
import {PaginationState} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";

export const getCourseListQuery = (courseIds: number[]) => queryOptions({
    queryKey: ["courses"],
    queryFn: () => getCoursesRequest(courseIds),
    enabled: courseIds.length > 0
});

// export const getPaginatedCoursesQuery = (
//     shouldSearch: boolean,
//     searchQuery: Partial<Course>,
//     pagination: PaginationState
// ) =>
//     queryOptions({
//         queryKey: ["courses", "page", searchQuery, pagination],
//         queryFn: () => fetchPaginatedCourses(searchQuery, pagination),
//         enabled: shouldSearch,
//         placeholderData: keepPreviousData,
//     });
