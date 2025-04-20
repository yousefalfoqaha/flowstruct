import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {getCourse, getCoursesRequest, getPaginatedCourses} from "@/features/course/api.ts";
import {TableSearchOptions} from "@/shared/types.ts";

export const courseKeys = {
    all: ['courses'] as const,
    lists: () => [...courseKeys.all, 'list'] as const,
    list: (options: Omit<TableSearchOptions, 'columnFilters'>) => [...courseKeys.lists(), options] as const,
    details: () => [...courseKeys.all, 'detail'] as const,
    detail: (id: number) => [...courseKeys.details(), id] as const,
};

export const getCourseQuery = (courseId: number) => queryOptions({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => getCourse(courseId)
});

export const getCourseListQuery = (courseIds: number[]) => queryOptions({
    queryKey: courseKeys.all,
    queryFn: () => getCoursesRequest(courseIds),
    enabled: courseIds.length > 0
});

export const getPaginatedCoursesQuery = (options: Omit<TableSearchOptions, 'columnFilters'>) =>
    queryOptions({
        queryKey: courseKeys.list(options),
        queryFn: () => getPaginatedCourses(options),
        placeholderData: keepPreviousData
    });
