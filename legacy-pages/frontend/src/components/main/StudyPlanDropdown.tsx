import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {StudyPlan} from "@/components/main/Main.tsx";
import {useStudyPlanListState} from "@/state/studyPlanList.ts";

type StudyPlanDropdownProps = {
    selectedProgramId: number | null;
    selectedStudyPlan: StudyPlan | null;
    setSelectedStudyPlan: (studyPlan: StudyPlan | null) => void;
}

export function StudyPlanDropdown({
                                      selectedProgramId,
                                      selectedStudyPlan,
                                      setSelectedStudyPlan
                                  }: StudyPlanDropdownProps
) {
    const [open, setOpen] = React.useState(false);
    const {queryResult: studyPlanList} = useStudyPlanListState(selectedProgramId);

    return (
        selectedProgramId && (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedStudyPlan ? selectedStudyPlan.startAcademicYear : 'Select a year...'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Filter programs..."/>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandList>
                            {
                                studyPlanList.isPending
                                    ? "Loading..."
                                    : <CommandGroup>
                                        {studyPlanList.data?.map((studyPlan) => (
                                            <CommandItem
                                                key={studyPlan.id}
                                                value={studyPlan.startAcademicYear.toString()}
                                                onSelect={(value) => {
                                                    setSelectedStudyPlan(
                                                        studyPlanList.data?.find((sp) =>
                                                            sp.startAcademicYear === parseInt(value)) || null
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                {studyPlan.startAcademicYear}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                            }
                            {studyPlanList.error ? "An error occurred." : null}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    )
}