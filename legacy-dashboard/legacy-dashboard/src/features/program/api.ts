import {Program, ProgramSummary} from "@/features/program/types.ts";
import {api} from "@/shared/api.ts";

const ENDPOINT = '/programs';

export const getProgram = async (programId: number) =>
    api.get<Program>([ENDPOINT, programId.toString()]);

export const getProgramList = async () =>
    api.get<ProgramSummary[]>(ENDPOINT);

export const createProgram = async (newProgram: Partial<Program>) =>
    api.post<ProgramSummary>(ENDPOINT, {body: newProgram});

export const toggleProgramVisibility = async (programId: number) =>
    api.put<Program>([ENDPOINT, programId.toString(), "toggle-visibility"]);

export const editProgramDetails = async ({programId, editedProgramDetails}: {
    programId: number;
    editedProgramDetails: Partial<Program>;
}) =>
    api.put<Program>([ENDPOINT, programId.toString()], {body: editedProgramDetails});

export const deleteProgram = async (programId: number) =>
    api.delete([ENDPOINT, programId.toString()]);
