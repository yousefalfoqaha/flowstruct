export const Degree = {
    BSc: "Bachelor of Science",
    BA: "Bachelor of Arts",
    MBA: "Master of Business Administration",
    PHD: "Doctor of Philosophy",
} as const;

export type Program = {
    id: number;
    code: string;
    name: string;
    degree: string;
    isPrivate: boolean;
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

export enum CourseRelation {
    AND = "AND",
    OR = "OR"
}

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

export type Section = {
    id: number;
    level: SectionLevel;
    type: SectionType;
    requiredCreditHours: number;
    name: string | null;
    position: number;
    courses: number[];
}

export type CourseSequences = {
    prerequisiteSequence: number[];
    postrequisiteSequence: number[];
    level: number;
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
    courseSequences: Record<number, CourseSequences>;
}

export type StudyPlanSummary = {
    id: number;
    year: number;
    track: string;
    program: number;
}
