import {Course, CoursesPage} from "@/features/course/types.ts";
import {PaginationState} from "@tanstack/react-table";

export const getCoursesRequest = async (courseIds: number[]) => {
    const res = await fetch(`http://localhost:8080/api/v1/courses/by-ids?courses=${courseIds}`);
    if (!res.ok) throw new Error("Failed to fetch course");
    return await res.json() as Course;
};

export const fetchPaginatedCourses = async (
    searchQuery: Partial<Course>,
    pagination: PaginationState
) => {
    const res = await fetch(
        `http://localhost:8080/api/v1/courses?code=${searchQuery.code}&name=${searchQuery.name}&page=${pagination.pageIndex}&size=${pagination.pageSize}`
    );
    if (!res.ok) throw new Error("Failed to fetch courses page");
    return (await res.json()) as CoursesPage;
};