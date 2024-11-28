import * as React from "react";
import {ProgramOption} from "@/state/programOptions.ts";
import {StudyPlanOption} from "@/state/studyPlanOptions.ts";
import {StudyPlanSelectionContext} from "@/contexts/StudyPlanSelectionContext.ts";
import {ReactNode} from "react";

export function StudyPlanSelectionProvider({children}: { children: ReactNode }) {
    const [selectedProgram, setSelectedProgram] = React.useState<ProgramOption | null>(null);
    const [selectedStudyPlan, setSelectedStudyPlan] = React.useState<StudyPlanOption | null>(null);
    const [activeStudyPlan, setActiveStudyPlan] = React.useState<StudyPlanOption | null>(null);

    const selectProgram = (program: ProgramOption) => {
        setSelectedProgram(program);
        setSelectedStudyPlan(null);
    }

    const selectStudyPlan = (studyPlan: StudyPlanOption) => {
        setSelectedStudyPlan(studyPlan);
    }

    return (
        <StudyPlanSelectionContext.Provider value={
            {
                selectedProgram,
                selectedStudyPlan,
                selectProgram,
                selectStudyPlan,
                activeStudyPlan,
                setActiveStudyPlan
            }
        }>
            {children}
        </StudyPlanSelectionContext.Provider>
    )
}