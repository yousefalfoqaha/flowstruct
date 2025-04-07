import {Course} from "@/features/course/types.ts";

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

export enum CourseRelation {
    AND = "AND",
    OR = "OR"
}

export enum MoveDirection {
    UP = "UP",
    DOWN = "DOWN"
}

export type CoursePrerequisite = {
    prerequisite: number;
    relation: CourseRelation;
}

export type Section = {
    id: number;
    level: SectionLevel;
    type: SectionType;
    requiredCreditHours: number;
    name: string | null;
    position: number;
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
    coursePrerequisites: Record<number, Record<number, CourseRelation>>;
    courseCorequisites: Record<number, number[]>;
}

export type FrameworkCourse = Course & {
    prerequisites: Record<number, CourseRelation>,
    corequisites: number[],
    section: number,
    sectionCode: string
}

export type StudyPlanListItem = Pick<StudyPlan, "id" | "year" | "duration" | "track" | "isPrivate" | "program">;