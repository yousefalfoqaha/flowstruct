import {useProgramOptions} from "@/state/programOptions.ts";
import {ProgramCard} from "@/components/programs-grid/ProgramCard.tsx";
import {Search} from "@/components/programs-grid/Search.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export function ProgramsGrid() {
    const {data: programCards} = useProgramOptions();
    const {selectProgram} = useStudyPlanSelection();

    return (
        <div className="mx-5 flex flex-col gap-4">
            <Tabs defaultValue="bachelor" className="mx-auto w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bachelor">Bachelors</TabsTrigger>
                    <TabsTrigger value="master">Masters</TabsTrigger>
                    <TabsTrigger value="phd">PHD</TabsTrigger>
                </TabsList>
            </Tabs>
            <Search />
            <div className="grid grid-cols-3 gap-5">
                {programCards.map((p) => {
                    return <ProgramCard key={p.id} {...p} selectProgram={() => selectProgram(p)} />
                })}
            </div>
        </div>
    )
}