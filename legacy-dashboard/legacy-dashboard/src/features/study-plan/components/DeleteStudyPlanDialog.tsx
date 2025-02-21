import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {useDeleteStudyPlan} from "@/features/study-plan/hooks/useDeleteStudyPlan.ts";

export function DeleteStudyPlanDialog() {
    const {item: studyPlan, dialogIsOpen, closeDialog} = useDialog<StudyPlanListItem>();
    const deleteStudyPlan = useDeleteStudyPlan();

    if (!studyPlan) return;

    return (
        <Dialog open={dialogIsOpen('DELETE')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track ?? ''} Study
                        Plan</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {deleteStudyPlan.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit" variant="destructive"
                                  onClick={() => deleteStudyPlan.mutate(studyPlan, {onSuccess: () => closeDialog})}>
                            <Trash/> Delete Study Plan
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}