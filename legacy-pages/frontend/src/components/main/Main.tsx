import * as React from "react";
import {StudyPlanDropdown} from "@/components/main/StudyPlanDropdown.tsx";
import {ProgramDropdown} from "@/components/main/ProgramDropdown.tsx";
import {Program} from "@/state/programList.ts";
import {StudyPlan} from "@/state/studyPlanList.ts";

export function Main() {
    const [selectedProgram, setSelectedProgram] = React.useState<Program | null>(null);
    const [selectedStudyPlan, setSelectedStudyPlan] = React.useState<StudyPlan | null>(null);

    return (
        <>
            <ProgramDropdown
                selectedProgram={selectedProgram}
                setSelectedProgram={setSelectedProgram}
                resetSelectedStudyPlan={() => setSelectedStudyPlan(null)}
            />
            <StudyPlanDropdown
                selectedProgramId={selectedProgram?.id}
                selectedStudyPlan={selectedStudyPlan}
                setSelectedStudyPlan={setSelectedStudyPlan}
            />
        </>
    );
}