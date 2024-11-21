import * as React from "react";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {StudyPlanDropdown} from "@/components/main/StudyPlanDropdown.tsx";
import {useProgramListState} from "@/state/programList.ts";

type Program = {
    id: number;
    name: string;
    degree: string;
};

export type StudyPlan = {
    id: number;
    name: string;
    startAcademicYear: number;
    track: string;
};

export function Main() {
    const [selectedProgram, setSelectedProgram] = React.useState<Program | null>(null);
    const [selectedStudyPlan, setSelectedStudyPlan] = React.useState<StudyPlan | null>(null);
    const [open, setOpen] = React.useState(false);
    const { queryResult: programList } = useProgramListState();

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedProgram ? selectedProgram.name : 'Select a program...'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Filter programs..."/>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandList>
                            {
                                programList.isPending
                                    ? "Loading..."
                                    : <CommandGroup>
                                        {programList.data?.map((program) => (
                                            <CommandItem
                                                key={program.id}
                                                value={program.id.toString()}
                                                onSelect={(value) => {
                                                    setSelectedProgram(
                                                        programList.data.find((p) =>
                                                            p.id.toString() === value) || null
                                                    );
                                                    setSelectedStudyPlan(null);
                                                    setOpen(false);
                                                }}
                                            >
                                                {program.name + " " + program.degree
                                                    .toLowerCase()
                                                    .charAt(0)
                                                    .toUpperCase() + program.degree.slice(1)}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                            }
                            {programList.error ? "An error occurred." : null}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <StudyPlanDropdown
                selectedProgramId={selectedProgram?.id}
                selectedStudyPlan={selectedStudyPlan}
                setSelectedStudyPlan={setSelectedStudyPlan}
            />
        </>
    );
}