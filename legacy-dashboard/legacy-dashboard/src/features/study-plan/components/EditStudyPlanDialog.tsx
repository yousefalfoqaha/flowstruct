import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {EditStudyPlanDetailsForm} from "@/features/study-plan/components/EditStudyPlanDetailsForm.tsx";

export function EditStudyPlanDialog() {
    const {dialogIsOpen, closeDialog} = useDialog<StudyPlanListItem>();

    return (
        <Dialog open={dialogIsOpen('EDIT')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Study Plan</DialogTitle>
                    <DialogDescription>
                        Make changes to the study plan overview.
                    </DialogDescription>
                </DialogHeader>

                <EditStudyPlanDetailsForm/>
            </DialogContent>
        </Dialog>
    );
}