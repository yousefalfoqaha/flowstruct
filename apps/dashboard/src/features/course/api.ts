import { Course, CoursesPage } from '@/features/course/types.ts';
import { api } from '@/shared/api.ts';
import { TableSearchOptions } from '@/shared/types.ts';

const ENDPOINT = '/courses';

export const getPaginatedCourseList = async (
  options: Omit<TableSearchOptions, 'columnFilters'>
) => {
  return api.get<CoursesPage>(ENDPOINT, {
    params: { ...options },
  });
};

export const createCourse = async (newCourse: Partial<Course>) =>
  api.post<Course>(ENDPOINT, {
    body: newCourse,
  });

export const getCourse = async (courseId: number) => api.get<Course>([ENDPOINT, courseId]);

export const editCourseDetails = async ({
  courseId,
  courseDetails,
}: {
  courseId: number;
  courseDetails: Partial<Course>;
}) =>
  api.put<Course>([ENDPOINT, courseId], {
    body: courseDetails,
  });
