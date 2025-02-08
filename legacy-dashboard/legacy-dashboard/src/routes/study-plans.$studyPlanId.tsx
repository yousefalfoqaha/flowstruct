import {createFileRoute} from "@tanstack/react-router";
import {getPrograms} from "@/queries/getPrograms.ts";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";
import {useSuspenseQuery} from "@tanstack/react-query";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        await queryClient.ensureQueryData(getPrograms());
        await queryClient.ensureQueryData(getStudyPlan(parseInt(params.studyPlanId)));
    },
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: studyPlan} = useSuspenseQuery(getStudyPlan(studyPlanId));
    const {data: programs} = useSuspenseQuery(getPrograms());
    const program = programs.find(p => p.id === studyPlan.program);

    const academicYears = Array.from({length: studyPlan.duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

    const coursesBySemester = new Map<number, number[]>(
        Array.from({length: studyPlan.duration * SEMESTERS_PER_YEAR}, (_, i) => [i + 1, []])
    );

    Object.entries(studyPlan.coursePlacements ?? {}).forEach(([courseId, semesterNum]) => {
        coursesBySemester.get(Number(semesterNum))?.push(Number(courseId));
    });

    return (
        <div className="space-y-6 p-8">
            <h1>{program?.name}</h1>
            <div className="overflow-auto flex gap-1">
                {academicYears.map((year) => {
                    const yearSemesters = semesterTypes.map((_, i) =>
                        year * SEMESTERS_PER_YEAR - (SEMESTERS_PER_YEAR - i) + 1
                    );

                    const isEmpty = yearSemesters.every(sem => !coursesBySemester.get(sem)?.length);
                    if (isEmpty) return null;

                    return (
                        <div key={year} className="space-y-1">
                            <h1 className="text-center p-2 bg-gray-500 text-white">Year {year}</h1>
                            <div className="flex gap-1 bg-gray-500 p-2 text-white">
                                {yearSemesters.map((semesterNumber, index) => {
                                    const semesterCourses = coursesBySemester.get(semesterNumber);
                                    if (!semesterCourses?.length) return null;

                                    return (
                                        <div key={semesterNumber}>
                                            <h3>{semesterTypes[index]}</h3>
                                            {semesterCourses.map((courseId) => {
                                                const course = studyPlan.courses[courseId];
                                                if (!course) return null;

                                                return (
                                                    <div key={courseId}>{course.code}</div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
