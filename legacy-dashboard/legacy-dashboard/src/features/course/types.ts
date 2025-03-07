export enum CourseType {
    F2F = "F2F",
    BLD = "BLD",
    OL = "OL"
}

export type Course = {
    id: number;
    code: string;
    name: string;
    creditHours: number;
    ects: number;
    lectureHours: number;
    practicalHours: number;
    type: CourseType;
    isRemedial: boolean;
}

export type CoursesPage = {
    content: Course[];
    page: number;
    size: number;
    totalCourses: number;
    totalPages: number;
    isLastPage: boolean;
}

export type CourseSummary = Pick<Course, "id" | "code" | "name" | "creditHours">;