import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {StudyPlanListItem, useStudyPlanListState} from "@/state/studyPlanList.ts";
import {Program} from "@/state/programList.ts";
import {ChevronDown} from "lucide-react";

type StudyPlanDropdownProps = {
    selectedProgram: Program | null;
    selectedStudyPlanListItem: StudyPlanListItem | null;
    setSelectedStudyPlanListItem: (studyPlanListItem: StudyPlanListItem | null) => void;
}

export function StudyPlanDropdown({
                                      selectedProgram,
                                      selectedStudyPlanListItem,
                                      setSelectedStudyPlanListItem
                                  }: StudyPlanDropdownProps
) {
    const [open, setOpen] = React.useState(false);
    const {queryResult: studyPlanList} = useStudyPlanListState(selectedProgram?.id)();

    return (
        selectedProgram && (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="p-3">
                        <div className="flex flex-row w-full">
                            <p className="my-auto text-left pr-2">
                                {
                                    selectedStudyPlanListItem
                                        ? `${selectedStudyPlanListItem.startAcademicYear}/${selectedStudyPlanListItem.startAcademicYear + 1} - ${selectedStudyPlanListItem.track}`
                                        : "Pick a study plan"
                                }
                            </p>
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 my-auto" />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                    {
                        studyPlanList.isPending
                            ? "Loading..."
                            : <Command>
                                <CommandInput placeholder="Filter study plans..."/>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandList>
                                    <CommandGroup>
                                        {studyPlanList.data?.map((li) => (
                                            <CommandItem
                                                key={li.id}
                                                value={li.startAcademicYear + " " + li.track}
                                                onSelect={() => {
                                                    setSelectedStudyPlanListItem(li);
                                                    setOpen(false);
                                                }}
                                            >
                                                {li.startAcademicYear + "/" + (li.startAcademicYear + 1)}
                                                {li.track ? " - " + li.track : ""}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                    }
                    {studyPlanList.error ? "An error occurred." : null}
                </PopoverContent>
            </Popover>
        )
    );
}
