import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {ChevronDown} from "lucide-react";
import {useStudyPlanOptions} from "@/state/studyPlanOptions.ts";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";

export function StudyPlanDropdown() {
    const [open, setOpen] = React.useState(false);
    const studyPlanOptions = useStudyPlanOptions();
    const {selectedStudyPlan, selectStudyPlan} = useStudyPlanSelection();

    return (
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
                    studyPlanOptions.isPending
                        ? "Loading..."
                        : <Command>
                            <CommandInput placeholder="Filter study plans..."/>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandList>
                                <CommandGroup>
                                    {studyPlanOptions.data.map((sp) => (
                                        <CommandItem
                                            key={sp.id}
                                            value={sp.startAcademicYear + " " + sp.track}
                                            onSelect={() => {
                                                selectStudyPlan(sp);
                                                setOpen(false);
                                            }}
                                        >
                                            {sp.startAcademicYear + "/" + (sp.startAcademicYear + 1)}
                                            {sp.track ? " - " + sp.track : ""}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                }
                {studyPlanOptions.error ? "An error occurred." : null}
            </PopoverContent>
        </Popover>
    );
}
