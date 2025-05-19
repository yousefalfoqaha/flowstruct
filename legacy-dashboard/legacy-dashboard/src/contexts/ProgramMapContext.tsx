import React, {ReactNode, useMemo} from "react";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";

type ProgramMapContextType = {
    movingCourse: number | null;
    moveCourse: (courseId: number | null) => void;
    allowedSemesters: Set<number>;
};

const ProgramMapContext = React.createContext<ProgramMapContextType | undefined>(undefined);

function ProgramMapProvider({children}: { children: ReactNode }) {
    const [movingCourse, setMovingCourse] = React.useState<number | null>(null);
    const {data: studyPlan} = useStudyPlan();
    const {coursesGraph} = useCoursesGraph();
    const SEMESTERS_PER_YEAR = 3;

    const moveCourse = (courseId: number | null) => {
        setMovingCourse(prev => (prev === courseId ? null : courseId));
    };

    const allowedSemesters = useMemo(() => {
        if (!movingCourse || !coursesGraph || !studyPlan) return new Set<number>();

        const requisites = coursesGraph.get(movingCourse);
        if (!requisites) return new Set<number>();

        const prerequisitePlacements = Array.from(requisites.prerequisiteSequence ?? [])
            .map(pr => studyPlan.coursePlacements[pr])
            .filter(Boolean);

        const postrequisitePlacements = Array.from(requisites.postrequisiteSequence ?? [])
            .map(pr => studyPlan.coursePlacements[pr])
            .filter(Boolean);

        let minSemester = Math.max(...prerequisitePlacements) + 1;
        let maxSemester = Math.min(...postrequisitePlacements) - 1;

        if (!Number.isFinite(minSemester)) {
            minSemester = 0;
        }

        if (!Number.isFinite(maxSemester)) {
            maxSemester = studyPlan.duration * SEMESTERS_PER_YEAR;
        }

        const semesters = new Set<number>();
        for (let i = minSemester; i <= maxSemester; i++) {
            semesters.add(i);
        }

        return semesters;
    }, [movingCourse, coursesGraph, studyPlan]);

    return (
        <ProgramMapContext.Provider value={{movingCourse, moveCourse, allowedSemesters}}>
            {children}
        </ProgramMapContext.Provider>
    );
}

const useProgramMap = () => {
    const context = React.useContext(ProgramMapContext);
    if (!context) throw new Error("useProgramMap hook must be used within ProgramMapProvider.");
    return context;
};

export {useProgramMap, ProgramMapContext, ProgramMapProvider};
