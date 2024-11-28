import {useQuery} from "@tanstack/react-query";

export type ProgramOption = {
    id: number;
    name: string;
    degree: string;
};

export const useProgramOptions = () => {
    const queryResult = useQuery<ProgramOption[], Error>({
        queryKey: ['programOptions'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/v1/programs');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        }
    });

    return {
        ...queryResult,
        data: queryResult.data ?? []
    };
};