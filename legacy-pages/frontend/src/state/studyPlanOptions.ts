import {useQuery} from "@tanstack/react-query";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

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
        enabled: !!selectedProgram?.id,
    });

    return {
        ...queryResult,
        data: queryResult.data ?? [],
    }
};
