import {Search} from "@/components/search/Search.tsx";
import {StudyPlan} from "@/components/study-plan/StudyPlan.tsx";

export default function App() {
    return (
        <div className="h-screen flex flex-col gap-3 items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-900">GJU Plans</h1>
            <Search />
            <StudyPlan />
        </div>
    )
}
