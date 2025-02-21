export enum CourseRelation {
    AND = "AND",
    OR = "OR"
}

export type CoursePrerequisite = {
    prerequisite: number;
    relation: CourseRelation;
    isRemedial: boolean;
}

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
    prerequisites: CoursePrerequisite[];
    corequisites: number[];
}

export type CoursesPage = {
    content: Course[];
    page: number;
    size: number;
    totalCourses: number;
    totalPages: number;
    isLastPage: boolean;
}