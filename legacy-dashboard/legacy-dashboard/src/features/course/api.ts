import {Course, CoursesPage} from "@/features/course/types.ts";

export const getCoursesRequest = async (courseIds: number[]) => {
    const res = await fetch(`http://localhost:8080/api/v1/courses/by-ids?courses=${courseIds}`);
    if (!res.ok) throw new Error("Failed to fetch course");
    return await res.json() as Record<number, Course>;
};

export const fetchPaginatedCoursesBySearch = async (search: string, pageParam: number) => {
    const res = await fetch(
        `http://localhost:8080/api/v1/courses?search=${search}&page=${pageParam}&size=5`
    );
    if (!res.ok) throw new Error("Failed to fetch courses page");
    return (await res.json()) as CoursesPage;
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
