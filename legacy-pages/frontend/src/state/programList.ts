import {createGlobalState} from "@/state/index.ts";

type Program = {
    id: number;
    name: string;
    degree: string;
};

export const useProgramListState = createGlobalState<Program[]>(
    ['programs'],
    async () => {
        const response = await fetch('http://localhost:8080/api/v1/programs');
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
);