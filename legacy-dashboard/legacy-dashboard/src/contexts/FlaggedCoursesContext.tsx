import React, {useContext} from "react";
import {useParams} from "@tanstack/react-router";
import {useQueryClient} from "@tanstack/react-query";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";

export type FlaggedCoursesContextType = {
    flaggedCourses: Set<number>;
};

const FlaggedCoursesContext = React.createContext<FlaggedCoursesContextType | undefined>(undefined);

function FlaggedCoursesProvider({children}: { children: React.ReactNode }) {
    const [flaggedCourses, setFlaggedCourses] = React.useState<Set<number>>(new Set());
    const [missingCourses, setMissingCourses] = React.useState<Set<number>>(new Set());

    const queryClient = useQueryClient();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const studyPlan: StudyPlan | undefined = queryClient.getQueryData(["study-plan", "detail", studyPlanId]);
    const coursesData: Record<number, Course> | undefined = queryClient.getQueryData(["courses"]);

    React.useEffect(() => {
        if (!studyPlan || !coursesData) return;

        const studyPlanCourses = new Set(studyPlan.sections.flatMap(s => s.courses));
        const newFlaggedCourses = new Set<number>();

        studyPlanCourses.forEach(id => {
            const course = coursesData[id];
            if (!course) return;

            const missingPrerequisites = course.prerequisites.some(
                prerequisite => !studyPlanCourses.has(prerequisite.prerequisite)
            );

            if (missingPrerequisites) {
                newFlaggedCourses.add(id);
            }
        });

        setFlaggedCourses(newFlaggedCourses);
    }, [coursesData, studyPlan]);

    return (
        <FlaggedCoursesContext.Provider value={{flaggedCourses}}>
            {children}
        </FlaggedCoursesContext.Provider>
    );
}

const useFlaggedCourses = () => {
    const context = useContext(FlaggedCoursesContext);

    if (!context) {
        throw Error("FlaggedCoursesProvider: useFlaggedCourses must be used within FlaggedCoursesProvider");
    }

    return context;
}

export {FlaggedCoursesContext, FlaggedCoursesProvider, useFlaggedCourses};
