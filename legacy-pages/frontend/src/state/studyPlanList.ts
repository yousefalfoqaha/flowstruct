import {createGlobalState} from "@/state/index.ts";

export type StudyPlan = {
    id: number;
    name: string;
    startAcademicYear: number;
    track: string;
};

export const useStudyPlanListState = (selectedProgramId: number | null) => {
    return createGlobalState<StudyPlan[]>(
        ['studyPlans', selectedProgramId],
        async () => {
            const response = await fetch(
                `http://localhost:8080/api/v1/programs/${selectedProgramId}/study-plans`
            );
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        { enabled: !!selectedProgramId }
    )();
};
