import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import * as React from "react";
import {Program, useProgramListState} from "@/state/programList.ts";

type ProgramDropdownProps = {
    selectedProgram: Program | null;
    setSelectedProgram: (program: Program | null) => void;
    resetSelectedStudyPlan: () => void;
}

export function ProgramDropdown({
                                    selectedProgram,
                                    setSelectedProgram,
                                    resetSelectedStudyPlan
                                }: ProgramDropdownProps
) {
    const [open, setOpen] = React.useState(false);
    const {queryResult: programList} = useProgramListState();

    return (
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
                                                resetSelectedStudyPlan();
                                                setOpen(false);
                                            }}
                                        >
                                            {program.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                        }
                        {programList.error ? "An error occurred." : null}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}