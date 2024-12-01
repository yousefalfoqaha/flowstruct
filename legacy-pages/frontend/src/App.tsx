import {Toaster} from "@/components/ui/toaster.tsx";
import {ProgramsGrid} from "@/components/programs-grid/ProgramsGrid.tsx";

export default function App() {
    return (
        <>
            <div className="h-screen flex flex-col max-w-screen-xl mx-auto border">
                <header className="flex flex-col gap-1 text-center m-5">
                    <h1 className="text-5xl font-bold text-gray-900">GJU Guide</h1>
                    <p className="text-muted-foreground">The All-Inclusive Curriculum Visualizer</p>
                </header>
                <ProgramsGrid />
            </div>
            <Toaster/>
        </>
    )
}
