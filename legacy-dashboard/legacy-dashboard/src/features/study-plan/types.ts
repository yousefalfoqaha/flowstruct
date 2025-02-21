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
    courses: Set<number>;
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

export type StudyPlanListItem = Pick<StudyPlan, "id" | "year" | "duration" | "track" | "isPrivate" | "program">;