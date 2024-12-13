export enum DegreeType {
    BACHELOR = "Bachelors",
    MASTER = "Masters"
}

export enum SemesterType {
    FIRST = "First",
    SECOND = "Second",
    SUMMER = "Summer"
}

export type Program = {
    code: string;
    name: string;
    degree: "BACHELOR" | "MASTER";
}

export type CoursePrerequisite = {
    prerequisite: number;
    relation: "AND" | "OR";
}

export type CourseSequences = {
    prerequisiteSequence: number[];
    postrequisiteSequence: number[];
    level: number;
}

export type Course = {
    id: number;
    code: string;
    name: string;
    creditHours: number;
    prerequisites: CoursePrerequisite[];
    sequences: CourseSequences;
}

export type Track = {
    code: string;
    name: string;
}

export type Section = {
    id: number;
    level: "PROGRAM" | "SCHOOL" | "UNIVERSITY";
    type: "REQUIREMENT" | "ELECTIVE" | "COMPULSORY";
    courses: number[];
}

export type StudyPlan = {
    id: number;
    startAcademicYear: number;
    duration: number;
    track: Track | null;
    program: Program;
    sections: Section[];
    courses: Record<number, Course>;
}