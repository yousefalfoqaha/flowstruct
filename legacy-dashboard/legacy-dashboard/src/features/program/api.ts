import {Program, ProgramListItem} from "@/features/program/types.ts";
import {api} from "@/shared/api.ts";

const ENDPOINT = '/programs';

export const getProgramRequest = async (programId: number) => {
    const res = await fetch(`http://localhost:8080/api/v1/programs/${programId}`);
    if (!res.ok) {
        throw new Error("Failed to get program");
    }
    return await res.json() as Program;
}

export const getProgramListRequest = async () => {
    const res = await fetch('http://localhost:8080/api/v1/programs');
    if (!res.ok) {
        throw new Error("Failed to get program list");
    }
    return await res.json() as ProgramListItem[];
};

export const createProgram = async (newProgram: Partial<Program>) =>
    api.post<ProgramListItem>(ENDPOINT, {body: newProgram});

export const toggleProgramVisibility = async (programId: number) =>
    api.put<Program>(`${ENDPOINT}/${programId}/toggle-visibility`);

export const editProgramDetails = async ({programId, editedProgramDetails}: {
    programId: number;
    editedProgramDetails: Partial<Program>
}) => api.put<Program>(`${ENDPOINT}/${programId}`, {body: editedProgramDetails});

export const deleteProgramRequest = async (programId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/programs/${programId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete program");
    }
};
