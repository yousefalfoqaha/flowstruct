import {useContext} from "react";
import {StudyPlanSelectionContext} from "@/contexts/StudyPlanSelectionContext.ts";


export function useStudyPlanSelection() {
    const context = useContext(StudyPlanSelectionContext);

    if(!context) throw new Error("useStudyPlanSelection must be used within the context");

    return context;
}