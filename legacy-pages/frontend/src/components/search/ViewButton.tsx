import {Button} from "@/components/ui/button.tsx";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";
import {useActiveStudyPlan} from "@/state/activeStudyPlan.ts";

export function ViewButton() {
    const {selectedStudyPlan, viewStudyPlan} = useStudyPlanSelection();
    const activeStudyPlan = useActiveStudyPlan();

    return (
        <Button
            disabled={!selectedStudyPlan || activeStudyPlan.isLoading}
            onClick={() => viewStudyPlan(selectedStudyPlan)}
        >
            View Study Plan
        </Button>
    )
}