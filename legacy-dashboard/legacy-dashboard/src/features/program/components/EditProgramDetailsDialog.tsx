import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {EditProgramDetailsForm} from "@/features/program/components/EditProgramDetailsForm.tsx";

export function EditProgramDetailsDialog() {
    const {dialogIsOpen, closeDialog} = useDialog<ProgramListItem>();

    return (
        <Dialog open={dialogIsOpen('EDIT')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Program</DialogTitle>
                    <DialogDescription>
                        Make changes to the program here. This will affect its study plans.
                    </DialogDescription>
                </DialogHeader>

                <EditProgramDetailsForm />
            </DialogContent>
        </Dialog>
    );
}