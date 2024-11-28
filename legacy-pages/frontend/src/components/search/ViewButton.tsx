import {Button} from "@/components/ui/button.tsx";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export function ViewButton() {
    const {selectedStudyPlan, setActiveStudyPlan} = useStudyPlanSelection();

    return (
        <Button
            disabled={!selectedStudyPlan}
            onClick={() => setActiveStudyPlan(selectedStudyPlan)}
        >
            View Study Plan
        </Button>
    )
}