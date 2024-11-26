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
                        {
                            selectedStudyPlanListItem
                                ? selectedStudyPlanListItem.startAcademicYear + " - " + selectedStudyPlanListItem.track
                                : (
                                    <div className="flex flex-row gap-1 w-full">
                                        <p>Select a study plan</p>
                                        <ChevronDown className="ml-auto" />
                                    </div>
                                )
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                    {
                        studyPlanList.isPending
                            ? "Loading..."
                            : <Command>
                                <CommandInput placeholder="Filter programs..."/>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandList>
                                    <CommandGroup>
                                        {studyPlanList.data?.map((studyPlanListItem) => (
                                            <CommandItem
                                                key={studyPlanListItem.id}
                                                value={studyPlanListItem.startAcademicYear + " " + studyPlanListItem.track}
                                                onSelect={() => {
                                                    setSelectedStudyPlanListItem(studyPlanListItem);
                                                    setOpen(false);
                                                }}
                                            >
                                                {studyPlanListItem.startAcademicYear}
                                                {studyPlanListItem.track ? " " + studyPlanListItem.track : ""}
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
