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
    degree: "Bachelor" | "Master";
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

export type Track = {
    code: string;
    name: string;
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
    track: Track | null;
    program: Program;
    sections: Section[];
    courses: Record<number, Course>;
    otherStudyPlans: StudyPlan[];
}

export type StudyPlanOption = {
    id: number;
    year: number;
    track: string;
    program: number;
}