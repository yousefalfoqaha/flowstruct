import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { COURSE_ENDPOINT } from '@/features/course/constants.ts';
import { TableSearchOptions } from '@/shared/types.ts';
import { api } from '@/shared/api.ts';
import { Course, CoursesPage } from '@/features/course/types.ts';

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
    queryFn: () => api.get<Course>([COURSE_ENDPOINT, courseId]),
  });

export const PaginatedCourseListQuery = (options: Omit<TableSearchOptions, 'columnFilters'>) =>
  queryOptions({
    queryKey: courseKeys.list(options),
    queryFn: () =>
      api.get<CoursesPage>(COURSE_ENDPOINT, {
        params: { ...options },
      }),
    placeholderData: keepPreviousData,
  });
