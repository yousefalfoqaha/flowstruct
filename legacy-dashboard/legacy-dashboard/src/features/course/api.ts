import {Course, CoursesPage} from "@/features/course/types.ts";
import {api} from "@/shared/api.ts";
import {TableSearchOptions} from "@/shared/types.ts";

const ENDPOINT = '/courses';

export const getCoursesRequest = async (courseIds: number[]) => {
    const res = await fetch(`http://localhost:8080/api/v1/courses/by-ids?courses=${courseIds}`);
    if (!res.ok) throw new Error("Failed to fetch course");
    return await res.json() as Record<number, Course>;
};

export const getPaginatedCourses = async (options: Omit<TableSearchOptions, 'columnFilters'>) => {
    return api.get<CoursesPage>(ENDPOINT, {
        params: {...options}
    });
};

export const createCourseRequest = async (newCourse: Partial<Course>) => {
    const res = await fetch('http://localhost:8080/api/v1/courses', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCourse),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create program");
    }

    return await res.json() as Course;
}
