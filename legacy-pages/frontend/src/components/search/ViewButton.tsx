import {Button} from "@/components/ui/button.tsx";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";
import {useActiveStudyPlan} from "@/state/activeStudyPlan.ts";

export function ViewButton() {
    const {selectedStudyPlan, setActiveStudyPlan} = useStudyPlanSelection();
    const activeStudyPlan = useActiveStudyPlan();

    return (
        <Button
            disabled={!selectedStudyPlan || activeStudyPlan.isLoading}
            onClick={() => setActiveStudyPlan(selectedStudyPlan)}
        >
            {activeStudyPlan.isLoading ? "Loading..." : "View Study Plan"}
        </Button>
    )
}