import {ReactNode} from "react";
import {StudyPlanContext} from "@/contexts/StudyPlanContext.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";

type StudyPlanProviderProps = {
    children: ReactNode;
    studyPlanId: number;
}

export function StudyPlanProvider({children, studyPlanId}: StudyPlanProviderProps) {
    const studyPlan = useSuspenseQuery(getStudyPlan(studyPlanId));

    return (
      <StudyPlanContext.Provider value={{studyPlan}}>
          {children}
      </StudyPlanContext.Provider>
    );
}