import {infiniteQueryOptions, queryOptions} from "@tanstack/react-query";
import {fetchPaginatedCoursesBySearch, getCoursesRequest} from "@/features/course/api.ts";

export const getCourseListQuery = (courseIds: number[]) => queryOptions({
    queryKey: ["courses"],
    queryFn: () => getCoursesRequest(courseIds),
    enabled: courseIds.length > 0
});

export const getPaginatedCoursesQuery = (search: string) => infiniteQueryOptions({
    queryKey: ["course", "page", search],
    queryFn: ({pageParam = 0}) => fetchPaginatedCoursesBySearch(search, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.isLastPage ? undefined : lastPage.page + 1,
    enabled: search !== ''
});
