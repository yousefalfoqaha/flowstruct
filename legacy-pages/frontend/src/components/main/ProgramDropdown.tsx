import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import * as React from "react";
import {Program, useProgramListState} from "@/state/programList.ts";
import {ChevronDown} from "lucide-react";

type ProgramDropdownProps = {
    selectedProgram: Program | null;
    setSelectedProgram: (program: Program | null) => void;
    resetSelectedStudyPlanItem: () => void;
}

export function ProgramDropdown({
                                    selectedProgram,
                                    setSelectedProgram,
                                    resetSelectedStudyPlanItem
                                }: ProgramDropdownProps
) {
    const [open, setOpen] = React.useState(false);
    const {queryResult: programList} = useProgramListState();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-3">
                    <div className="flex flex-row w-full">
                        <p className="my-auto text-left pr-2">
                            {
                                selectedProgram
                                    ? `${selectedProgram.degree} ${selectedProgram.name}`
                                    : "Pick a program"
                            }
                        </p>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 my-auto" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
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
                                            value={program.degree + " " + program.name}
                                            onSelect={() => {
                                                setSelectedProgram(program);
                                                resetSelectedStudyPlanItem();
                                                setOpen(false);
                                            }}
                                        >
                                            {`${program.degree} ${program.name}`}
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