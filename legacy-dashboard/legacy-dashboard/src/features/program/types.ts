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

export type ProgramListItem = Pick<Program,
    "id" | "code" | "name" | "degree" | "isPrivate">;
