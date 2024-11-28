import {useQuery} from "@tanstack/react-query";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export enum SectionLevel {
    UNIVERSITY = "UNIVERSITY",
    SCHOOL = "SCHOOL",
    PROGRAM = "PROGRAM",
}

export enum SectionType {
    REQUIREMENT = "REQUIREMENT",
    ELECTIVE = "ELECTIVE",
    REMEDIAL = "REMEDIAL",
}

export type StudyPlan = {
    id: number;
    startAcademicYear: number;
    duration: number;
    track: string | null;
    sections: Section[];
    courses: Course[];
};

export type Section = {
    id: number;
    level: SectionLevel;
    type: SectionType;
    name: string | null;
    courses: number[];
};

export type Course = {
    id: number;
    code: string;
    name: string;
    creditHours: number;
    prerequisites: { id: number; relation: string };
}

export const useActiveStudyPlan = () => {
    const {activeStudyPlan} = useStudyPlanSelection();

    return useQuery<StudyPlan, Error>({
        queryKey: ['studyPlan', activeStudyPlan?.id],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:8080/api/v1/study-plans/${activeStudyPlan?.id}`
            );
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        enabled: !!activeStudyPlan?.id
    })
}