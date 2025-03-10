import React, {ReactNode} from "react";
import {useParams} from "@tanstack/react-router";
import {SectionCourse, StudyPlan} from "@/features/study-plan/types.ts";
import {useQueryClient} from "@tanstack/react-query";
import {Course} from "@/features/course/types.ts";

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
    const queryClient = useQueryClient();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const studyPlan: StudyPlan | undefined = queryClient.getQueryData(["study-plan", "detail", studyPlanId]);

    const coursesData: Record<number, Course> | undefined = queryClient.getQueryData(["courses"]);

    React.useEffect(() => {
        if (!studyPlan) return;

        const sectionCourses: Map<number, SectionCourse> = new Map(
            studyPlan.sections.flatMap((section) =>
                Object.entries(section.courses).map(([courseId, sectionCourse]) => [
                    Number(courseId),
                    sectionCourse,
                ])
            )
        );

        const traversePrerequisites = (
            courseId: number,
            courses: Map<number, SectionCourse>,
            visited: Set<number>,
            graph: Map<number, CourseRequisites>
        ) => {
            const course = courses.get(courseId);
            if (!course) return;

            for (const prereq of course.prerequisites) {
                const prereqId = prereq.prerequisite;

                if (!courses.has(prereqId)) continue;

                if (coursesData && coursesData[prereqId]?.isRemedial) continue;

                if (!visited.has(prereqId)) {
                    traversePrerequisites(prereqId, courses, visited, graph);
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
            courses: Map<number, SectionCourse>,
            visited: Set<number>,
            graph: Map<number, CourseRequisites>
        ) => {
            const currentSeq = graph.get(courseId)!;
            const postCourses = new Set(currentSeq.postrequisiteSequence);

            for (const postId of postCourses) {
                if (!courses.has(postId)) continue;

                if (coursesData && coursesData[postId]?.isRemedial) continue;

                if (!visited.has(postId)) {
                    traversePostrequisites(postId, courses, visited, graph);
                }

                const postSeq = graph.get(postId)!;

                currentSeq.postrequisiteSequence.add(postId);
                postSeq.postrequisiteSequence.forEach((id) => currentSeq.postrequisiteSequence.add(id));
            }
            visited.add(courseId);
        };

        const buildCoursesGraph = (courses: Map<number, SectionCourse>): Map<number, CourseRequisites> => {
            const visited = new Set<number>();
            const graph = new Map<number, CourseRequisites>();

            courses.forEach((_, courseId) => {
                graph.set(courseId, {prerequisiteSequence: new Set(), postrequisiteSequence: new Set()});
            });

            courses.forEach((_, courseId) => {
                if (!visited.has(courseId)) {
                    traversePrerequisites(courseId, courses, visited, graph);
                }
            });

            visited.clear();

            courses.forEach((_, courseId) => {
                if (!visited.has(courseId)) {
                    traversePostrequisites(courseId, courses, visited, graph);
                }
            });

            return graph;
        };

        const newGraph = buildCoursesGraph(sectionCourses);
        setCoursesGraph(newGraph);
    }, [studyPlan?.sections, coursesData, studyPlan]);

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

export { useCoursesGraph, CoursesGraphContext, CoursesGraphProvider};