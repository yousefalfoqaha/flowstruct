
export type Program = {
    id: number;
    code: string;
    name: string;
    degree: string;
}

export type ProgramListItem = Pick<Program,
    "id" | "code" | "name" | "degree">;