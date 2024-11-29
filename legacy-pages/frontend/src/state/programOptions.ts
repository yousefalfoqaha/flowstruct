import {useQuery} from "@tanstack/react-query";
import * as React from "react";
import {toast} from "@/hooks/use-toast.ts";

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
    
    React.useEffect(() => {
        if (queryResult.error) {
            toast({
                title: queryResult.error?.message || "Something went wrong with your request",
                variant: "destructive",
            });
        }
    }, [queryResult.error, queryResult.error?.message]);

    return {
        ...queryResult,
        data: queryResult.data ?? []
    };
};