import {createContext} from "react";
import {ProgramOption} from "@/state/programOptions.ts";
import {StudyPlanOption} from "@/state/studyPlanOptions.ts";

type StudyPlanSelectionContextType = {
    selectedProgram: ProgramOption | null;
    selectedStudyPlan: StudyPlanOption | null;
    selectProgram: (program: ProgramOption | null) => void;
    selectStudyPlan: (studyPlan: StudyPlanOption) => void;
    activeStudyPlan: StudyPlanOption | null;
    viewStudyPlan: (studyPlan: StudyPlanOption | null) => void;
};

export const StudyPlanSelectionContext =
    createContext<StudyPlanSelectionContextType | undefined>(undefined);