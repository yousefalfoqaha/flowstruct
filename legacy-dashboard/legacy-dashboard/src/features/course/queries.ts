import {infiniteQueryOptions, keepPreviousData, queryOptions} from "@tanstack/react-query";
import {fetchPaginatedCoursesBySearch, getCoursesRequest} from "@/features/course/api.ts";

export const courseKeys = {
    all: ['courses'] as const,
    lists: () => [...courseKeys.all, 'list'] as const,
    list: (search: string) => [...courseKeys.lists(), search] as const,
    details: () => [...courseKeys.all, 'detail'] as const,
    detail: (id: number) => [...courseKeys.details(), id] as const,
};

export const getCourseListQuery = (courseIds: number[]) => queryOptions({
    queryKey: courseKeys.all,
    queryFn: () => getCoursesRequest(courseIds),
    enabled: courseIds.length > 0
});

export const getPaginatedCoursesQuery = (search: string) => infiniteQueryOptions({
    queryKey: courseKeys.list(search),
    queryFn: ({pageParam = 0}) => fetchPaginatedCoursesBySearch(search, pageParam),
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.isLastPage ? undefined : lastPage.page + 1,
    enabled: search !== ''
});
