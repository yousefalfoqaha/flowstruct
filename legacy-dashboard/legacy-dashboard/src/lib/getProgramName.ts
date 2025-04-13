import {Program} from "@/features/program/types.ts";

export const getProgramDisplayName = (program: Pick<Program, 'degree' | 'name'>) => (
    `${program.degree}. ${program.name}`
);