export type ProgramOption = {
    id: number;
    code: string;
    name: string;
    degree: string;
}

export type StudyPlanOption = {
    id: number;
    year: number;
    track: string;
    isPrivate: boolean;
    program: number;
}