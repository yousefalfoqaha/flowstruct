import {createGlobalState} from "@/state/index.ts";

export type SelectedStudyPlan = {
    id: number;
    startAcademicYear: number;
    duration: number;
    sections: Section[];
    courses: Course[];
};

export type Section = {
    id: number;
    level: string;
    type: string;
    name: string | null;
    courseIds: number[];
};

export type Course = {
    id: number;
    code: string;
    name: string;
    creditHours: number;
    prerequisites: { id: number; relation: string };
}

export const useSelectedStudyPlanState = (selectedStudyPlanId: number | undefined) => {
    return createGlobalState<SelectedStudyPlan>(
        ['studyPlan', selectedStudyPlanId],
        async () => {
            const response = await fetch(
                `http://localhost:8080/api/v1/study-plans/${selectedStudyPlanId}`
            );
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        { enabled: !!selectedStudyPlanId }
    );
};