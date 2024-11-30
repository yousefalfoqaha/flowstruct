import {StudyPlan} from "@/components/study-plan/StudyPlan.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Button} from "@/components/ui/button.tsx";
import {StudyPlanBrowser} from "@/components/study-plan-browser/StudyPlanBrowser.tsx";

export default function App() {
    return (
        <>
            <div className="h-screen flex flex-col gap-3 items-center justify-center">
                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mt-5">GJU Plans</h1>
                    <p className="text-muted-foreground">The All-Inclusive Curriculum Visualizer</p>
                </div>
                <StudyPlanBrowser />
                <StudyPlan/>
            </div>
            <Toaster/>
        </>
    )
}
