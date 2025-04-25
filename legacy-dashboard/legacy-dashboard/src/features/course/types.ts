export const CourseType = {
    F2F: "Face-to-Face",
    BLD: "Blended",
    OL: "Online"
} as const;

export type Course = {
    id: number;
    code: string;
    name: string;
    creditHours: number;
    ects: number;
    lectureHours: number;
    practicalHours: number;
    type: string;
    isRemedial: boolean;
}

export type CoursesPage = {
    content: CourseSummary[];
    page: number;
    size: number;
    totalCourses: number;
    totalPages: number;
    isLastPage: boolean;
}

export type CourseSummary = Pick<Course, "id" | "code" | "name" | "creditHours" | "type" | "isRemedial">;