import {queryOptions} from "@tanstack/react-query";
import {ProgramOption} from "@/types";

export const getPrograms = () => queryOptions({
    queryKey: ['programs'],
    queryFn: async () => {
        const res = await fetch('http://localhost:8080/api/v1/programs');
        return await res.json() as ProgramOption[];
    }
});