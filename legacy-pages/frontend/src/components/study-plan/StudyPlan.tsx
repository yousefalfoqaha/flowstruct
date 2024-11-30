import {useStudyPlanOptions} from "@/state/studyPlanOptions.ts";

export function StudyPlan() {
    const {data: studyPlans} = useStudyPlanOptions();

    return (
        <div>
            {studyPlans.length ? (
                <ul>
                    {studyPlans.map((plan) => (
                        <li key={plan.id}>
                            {plan.startAcademicYear}/{plan.startAcademicYear + 1} - {plan.track}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No study plans available for this program.</p>
            )}
        </div>
    );
}
