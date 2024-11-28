import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";
import {ProgramDropdown} from "@/components/search/ProgramDropdown.tsx";
import {StudyPlanDropdown} from "@/components/search/StudyPlanDropdown.tsx";
import {Button} from "@/components/ui/button.tsx";

export function Search() {
    const {selectedStudyPlan, setActiveStudyPlan} = useStudyPlanSelection();

    return (
        <div className="flex flex-wrap gap-1">
            <ProgramDropdown/>
            <StudyPlanDropdown/>
            <Button
                disabled={!selectedStudyPlan}
                onClick={() => setActiveStudyPlan(selectedStudyPlan)}
            >
                View Study Plan
            </Button>
        </div>
    );
}
