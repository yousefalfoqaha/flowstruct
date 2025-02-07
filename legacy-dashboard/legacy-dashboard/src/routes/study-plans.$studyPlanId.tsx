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
    const {data} = useSuspenseQuery(getStudyPlan(studyPlanId));

    const years = Array.from({length: data.duration}, (_, i) => i + 1);
    const semesters = Array.from({length: data.duration * 3}, (_, i) => i + 1);
    const semesterHeaders = ["First", "Second", "Summer"];

    const semesterCourses: Map<number, number[]> = new Map(
        semesters.map((semesterIndex) => [semesterIndex, []])
    );

    Object.entries(data.coursePlacements).forEach(([key, value]) => {
        const semesterIndex = Number(value);
        semesterCourses.get(semesterIndex)?.push(Number(key));
    });

    return (
        <div className="space-y-6 p-8">
            <div className="overflow-auto flex gap-1">
                {years.map((year) => (
                    <div key={year} className="space-y-1">
                        <h1 className="text-center p-2 bg-gray-500 text-white">Year {year}</h1>
                        <div className="flex gap-1 bg-gray-500 p-2 text-white">
                            {semesterHeaders.map((header, index) => {
                                const semester = year * 3 - (3 - index) + 1;

                                if (semesterCourses.get(semester)?.length === 0 || undefined) return;

                                return (
                                    <div key={semester}>
                                        <h3>{header}</h3>
                                        {semesterCourses.get(semester)?.map((courseId) => {
                                                const course = data.courses[courseId];

                                                if (!course) return;

                                                return (
                                                    <div key={courseId}>
                                                        {data.courses[courseId].code}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
