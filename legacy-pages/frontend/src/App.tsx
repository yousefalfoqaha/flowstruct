import {Search} from "@/components/search/Search.tsx";
import {StudyPlan} from "@/components/study-plan/StudyPlan.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

export default function App() {
    return (
        <>
            <div className="h-screen flex flex-col gap-3 items-center justify-center">
                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mt-5">GJU Plans</h1>
                    <h3 className="text-muted-foreground">Admin Page</h3>
                </div>
                <Search/>
                <StudyPlan/>
            </div>
            <Toaster/>
        </>
    )
}
