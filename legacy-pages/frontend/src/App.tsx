import {Search} from "@/components/search/Search.tsx";
import {StudyPlanSelectionProvider} from "@/providers/StudyPlanSelectionProvider.tsx";

export default function App() {
    return <>
        <StudyPlanSelectionProvider>
            <Search/>
        </StudyPlanSelectionProvider>
    </>
}
