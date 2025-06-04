import { infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCourse, getPaginatedCourseList } from '@/features/course/api.ts';
import { TableSearchOptions } from '@/shared/types.ts';

export const courseKeys = {
  all: ['courses'] as const,
  infinites: () => [...courseKeys.all, 'infinite'] as const,
  infinite: (filter: string) => [...courseKeys.infinites(), filter] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (options: Omit<TableSearchOptions, 'columnFilters'>) =>
    [...courseKeys.lists(), options] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: number) => [...courseKeys.details(), id] as const,
};

export const CourseQuery = (courseId: number) =>
  queryOptions({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => getCourse(courseId),
  });

export const PaginatedCourseListQuery = (options: Omit<TableSearchOptions, 'columnFilters'>) =>
  queryOptions({
    queryKey: courseKeys.list(options),
    queryFn: () => getPaginatedCourseList(options),
    placeholderData: keepPreviousData,
  });

export const InfiniteCoursesQuery = (filter: string) =>
  infiniteQueryOptions({
    queryKey: courseKeys.infinite(filter),
    queryFn: ({ pageParam }) =>
      getPaginatedCourseList({
        page: pageParam,
        filter: filter,
        size: 5,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.isLastPage ? undefined : lastPage.page + 1),
    placeholderData: keepPreviousData,
    enabled: filter.trim().length > 0,
  });
