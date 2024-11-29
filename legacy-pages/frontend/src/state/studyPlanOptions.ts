import {useQuery} from "@tanstack/react-query";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";
import * as React from "react";
import {toast} from "@/hooks/use-toast.ts";

export type StudyPlanOption = {
    id: number;
    name: string;
    startAcademicYear: number;
    track: string;
};

export const useStudyPlanOptions = () => {
    const {selectedProgram} = useStudyPlanSelection();

    const queryResult = useQuery<StudyPlanOption[], Error>({
        queryKey: ['studyPlanOptions', selectedProgram?.id],
        queryFn:
            async () => {
                const response = await fetch(
                    `http://localhost:8080/api/v1/programs/${selectedProgram?.id}/study-plans`
                );
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            },
        enabled: !!selectedProgram,
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
        data: queryResult.data ?? [],
    }
};
