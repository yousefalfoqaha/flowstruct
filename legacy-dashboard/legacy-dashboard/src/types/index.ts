export type ProgramOption = {
    id: number;
    code: string;
    name: string;
    degree: string;
}

export type StudyPlanOption = {
    id: number;
    year: number;
    duration: number;
    track: string;
    isPrivate: boolean;
    program: number;
}

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

export enum SectionLevel {
    University = "University",
    School = "School",
    Program = "Program"
}

export enum SectionType {
    Requirement = "Requirement",
    Elective = "Elective",
    Remedial = "Remedial"
}

export type Section = {
    id: number;
    level: SectionLevel;
    type: SectionType;
    requiredCreditHours: number;
    name: string | null;
    courses: number[];
}

export type StudyPlan = {
    id: number;
    year: number;
    duration: number;
    track: string | null;
    isPrivate: boolean;
    program: number;
    sections: Section[];
    coursePlacements: Record<number, number>;
}

export type CoursesPage = {
    content: Course[];
    page: number;
    size: number;
    totalCourses: number;
    totalPages: number;
    isLastPage: boolean;
}