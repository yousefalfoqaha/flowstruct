import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Book } from "lucide-react";
import { useProgramOptions } from "@/state/programOptions.ts";
import { Program } from "@/components/study-plan-browser/Program.tsx";
import {useStudyPlanSelection} from "@/hooks/useStudyPlanSelection.ts";
import {StudyPlan} from "@/components/study-plan/StudyPlan.tsx";

export function StudyPlanBrowser() {
    const { data: programs } = useProgramOptions();
    const {selectedProgram, selectProgram} = useStudyPlanSelection();

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="flex flex-row gap-3">
                    <Book />
                    <p>View a Study Plan</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{selectedProgram ? 'Study Plans' : 'Programs Offered'}</DialogTitle>
                    <DialogDescription>
                        {selectedProgram
                            ? 'Navigate through the study plans for this program.'
                            : 'Navigate to a program to view its study plans'
                        }
                    </DialogDescription>
                </DialogHeader>

                {/* If a program is selected, show the study plans. Otherwise, show the program list. */}
                {selectedProgram ? (
                    <>
                        <StudyPlan />

                        {/* Button to go back to program list */}
                        <Button variant="secondary" onClick={() => selectProgram(null)}>
                            Back to Programs
                        </Button>
                    </>
                ) : (
                    // Display list of programs
                    programs.map((program) => (
                        <Program
                            key={program.id}
                            {...program}
                            onClick={() => selectProgram(program)} // Set program on click
                        />
                    ))
                )}

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
