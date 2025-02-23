import {Program, ProgramListItem} from "@/features/program/types.ts";

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

export const createProgramRequest = async (newProgram: Partial<Program>) => {
    const res = await fetch("http://localhost:8080/api/v1/programs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newProgram),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create program");
    }

    return res.json();
};

export const editProgramDetailsRequest = async ({programId, editedProgramDetails}: {
    programId: number;
    editedProgramDetails: Partial<Program>
}) => {
    const response = await fetch(`http://localhost:8080/api/v1/programs/${programId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editedProgramDetails),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update program");
    }

    return response.json();
};

export const deleteProgramRequest = async (programId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/programs/${programId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete program");
    }
};
