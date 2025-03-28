import React, {ReactNode} from "react";
import {useParams} from "@tanstack/react-router";
import {CourseRelation} from "@/features/study-plan/types.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

type CoursesGraphContextType = {
    coursesGraph: Map<number, CourseRequisites>;
};

export type CourseRequisites = {
    prerequisiteSequence: Set<number>;
    postrequisiteSequence: Set<number>;
};

const CoursesGraphContext = React.createContext<CoursesGraphContextType | undefined>(undefined);

function CoursesGraphProvider({children}: { children: ReactNode }) {
    const [coursesGraph, setCoursesGraph] = React.useState<Map<number, CourseRequisites>>(new Map());

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const {data: studyPlan} = useStudyPlan(studyPlanId);

    React.useEffect(() => {
        if (!studyPlan) return;

        const traversePrerequisites = (
            courseId: number,
            coursePrerequisitesMap: Record<number, Record<number, CourseRelation>>,
            visited: Set<number>,
            graph: Map<number, CourseRequisites>
        ) => {
            const prerequisites = coursePrerequisitesMap[courseId];
            if (!prerequisites) return;

            for (const prereq in prerequisites) {
                const prereqId = Number(prereq);

                if (!visited.has(prereqId)) {
                    traversePrerequisites(prereqId, coursePrerequisitesMap, visited, graph);
                }

                const currentSeq = graph.get(courseId)!;
                const prereqSeq = graph.get(prereqId)!;

                prereqSeq.prerequisiteSequence.forEach((id) => currentSeq.prerequisiteSequence.add(id));
                currentSeq.prerequisiteSequence.add(prereqId);

                prereqSeq.postrequisiteSequence.add(courseId);
            }
            visited.add(courseId);
        };

        const traversePostrequisites = (
            courseId: number,
            visited: Set<number>,
            graph: Map<number, CourseRequisites>
        ) => {
            const currentSeq = graph.get(courseId)!;
            const postCourses = new Set(currentSeq.postrequisiteSequence);

            for (const postId of postCourses) {

                if (!visited.has(postId)) {
                    traversePostrequisites(postId, visited, graph);
                }

                const postSeq = graph.get(postId)!;

                currentSeq.postrequisiteSequence.add(postId);
                postSeq.postrequisiteSequence.forEach((id) => currentSeq.postrequisiteSequence.add(id));
            }
            visited.add(courseId);
        };

        const buildCoursesGraph = (courses: number[]): Map<number, CourseRequisites> => {
            const visited = new Set<number>();
            const graph = new Map<number, CourseRequisites>();

            courses.forEach((courseId) => {
                graph.set(courseId, {prerequisiteSequence: new Set(), postrequisiteSequence: new Set()});
            });

            courses.forEach((courseId) => {
                if (!visited.has(courseId)) {
                    traversePrerequisites(courseId, studyPlan.coursePrerequisites, visited, graph);
                }
            });

            visited.clear();

            courses.forEach((courseId) => {
                if (!visited.has(courseId)) {
                    traversePostrequisites(courseId, visited, graph);
                }
            });

            return graph;
        };

        const newGraph = buildCoursesGraph(studyPlan.sections.flatMap(section => section.courses));
        setCoursesGraph(newGraph);
    }, [studyPlan, studyPlan?.sections]);

    return (
        <CoursesGraphContext.Provider value={{coursesGraph}}>
            {children}
        </CoursesGraphContext.Provider>
    );
}

const useCoursesGraph = () => {
    const context = React.useContext(CoursesGraphContext);

    if (!context) {
        throw new Error("oopsie");
    }

    return context;
}

export {useCoursesGraph, CoursesGraphContext, CoursesGraphProvider};
