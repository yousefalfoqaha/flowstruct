import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {CoursesPage} from "@/types";
import {PaginationState} from "@tanstack/react-table";

export const getPaginatedCourses = (
    shouldSearch: boolean,
    searchQuery: {code: string, name: string},
    pagination: PaginationState
) =>
    queryOptions({
        queryKey: ["courses", searchQuery, pagination],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:8080/api/v1/courses?code=${searchQuery.code}&name=${searchQuery.name}&page=${pagination.pageIndex}&size=${pagination.pageSize}`
            );
            return (await res.json()) as CoursesPage;
        },
        enabled: shouldSearch,
        placeholderData: keepPreviousData,
    });
