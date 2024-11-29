import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import * as React from "react";
import {useProgramOptions} from "@/state/programOptions.ts";
import {ChevronDown, Plus} from "lucide-react";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export function ProgramDropdown() {
    const [open, setOpen] = React.useState(false);
    const {data: programOptions, isLoading, isError} = useProgramOptions();
    const {selectedProgram, selectProgram} = useStudyPlanSelection();

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
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 my-auto"/>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                {
                    isLoading
                        ? <div className="p-5 text-muted-foreground text-center">Loading...</div>
                        : <>
                            <Command>
                                <CommandInput placeholder="Filter programs..."/>
                                <CommandEmpty>{isError ? 'An error occurred.' : 'No results found.'}</CommandEmpty>
                                <CommandList>
                                    <CommandGroup className="p-2">
                                        {programOptions.map((program) => (
                                            <CommandItem
                                                key={program.id}
                                                value={program.degree + " " + program.name}
                                                onSelect={() => {
                                                    selectProgram(program);
                                                    setOpen(false);
                                                }}
                                            >
                                                {`${program.degree} ${program.name}`}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            <section className="p-2 border-t">
                                <Button className="ml-auto flex gap-2 px-3">
                                    <p className="h-full my-auto">Create New Program</p>
                                    <Plus className="ml-auto"/>
                                </Button>
                            </section>
                        </>
                }
            </PopoverContent>
        </Popover>
    )
}