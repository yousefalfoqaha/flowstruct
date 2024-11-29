import {ProgramDropdown} from "@/components/search/ProgramDropdown.tsx";
import {StudyPlanDropdown} from "@/components/search/StudyPlanDropdown.tsx";
import {ViewButton} from "@/components/search/ViewButton.tsx";

export function Search() {
    return (
        <div className="flex flex-row gap-1">
            <ProgramDropdown />
            <StudyPlanDropdown />
            <ViewButton />
        </div>
    );
}
