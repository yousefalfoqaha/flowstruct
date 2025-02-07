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

export type CoursePrerequisite = {
    prerequisite: number;
    relation: "AND" | "OR";
    isRemedial: boolean;
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
    ects: number;
    lectureHours: number;
    practicalHours: number;
    type: "F2F" | "BLD" | "OL";
    isRemedial: boolean;
    prerequisites: CoursePrerequisite[];
    corequisites: number[];
    sequences: CourseSequences;
}

export type Section = {
    id: number;
    level: "Program" | "School" | "University";
    type: "Requirement" | "Elective" | "Remedial";
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
    coursePlacements: Map<number, number>;
    courses: Record<number, Course>;
}