import {createContext} from "react";
import {StudyPlan} from "@/types";
import {UseSuspenseQueryResult} from "@tanstack/react-query";

type StudyPlanContextType = {
    studyPlan: UseSuspenseQueryResult<StudyPlan, Error>;
}

export const StudyPlanContext = createContext<StudyPlanContextType | undefined>(
    undefined
);