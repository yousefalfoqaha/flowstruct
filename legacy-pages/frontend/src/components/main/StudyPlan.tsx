import {useSelectedStudyPlanState} from "@/state/selectedStudyPlan.ts";

type StudyPlanProps = { selectedStudyPlanId: number | undefined }
enum Semester { First, Second, Summer }

export function StudyPlan({selectedStudyPlanId}: StudyPlanProps) {
    const {queryResult: studyPlan} = useSelectedStudyPlanState(selectedStudyPlanId)();

    if (studyPlan.isLoading) return "Loading...";
    if (studyPlan.isError) return "An error occurred.";

    const years = Array.from(
        { length: studyPlan.data?.duration },
        (_, i) => studyPlan.data?.startAcademicYear + i
    );

    return (
        studyPlan.data && (<div className="">
            {years.map((yr) => {return <div key={yr}>{yr + "/" + (yr + 1)}</div>})}
        </div>)
    )
}