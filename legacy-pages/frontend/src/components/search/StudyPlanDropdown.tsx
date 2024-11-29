import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {ChevronDown} from "lucide-react";
import {useStudyPlanOptions} from "@/state/studyPlanOptions.ts";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export function StudyPlanDropdown() {
    const [open, setOpen] = React.useState(false);
    const {data: studyPlanOptions, isLoading, isError} = useStudyPlanOptions();
    const {selectedStudyPlan, selectStudyPlan, selectedProgram} = useStudyPlanSelection();

    return (
        selectedProgram && (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="p-3">
                        <div className="flex flex-row w-full">
                            <p className="my-auto text-left pr-2">
                                {
                                    selectedStudyPlan
                                        ? `${selectedStudyPlan.startAcademicYear}/${selectedStudyPlan.startAcademicYear + 1} - ${selectedStudyPlan.track}`
                                        : "Pick a study plan"
                                }
                            </p>
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 my-auto"/>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                    {
                        isLoading
                            ? <div className="p-5 text-muted-foreground text-center">Loading...</div>
                            : (
                                <Command>
                                    <CommandInput placeholder="Filter study plans..."/>
                                    <CommandEmpty>{isError ? 'An error occurred.' : 'No results found.'}</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            {studyPlanOptions.map((studyPlan) => (
                                                <CommandItem
                                                    key={studyPlan.id}
                                                    value={studyPlan.startAcademicYear + " " + studyPlan.track}
                                                    onSelect={() => {
                                                        selectStudyPlan(studyPlan);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {studyPlan.startAcademicYear + "/" + (studyPlan.startAcademicYear + 1)}
                                                    {studyPlan.track ? " - " + studyPlan.track : ""}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            )
                    }
                </PopoverContent>
            </Popover>
        )
    );
}
