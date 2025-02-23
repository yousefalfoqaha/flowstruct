import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {Section} from "@/features/study-plan/types.ts";
import {EditSectionDetailsForm} from "@/features/study-plan/components/EditSectionDetailsForm.tsx";

export function EditSectionDetailsDialog() {
    const {dialogIsOpen, closeDialog, item: section} = useDialog<Section>();

    if (!section) return;

    return (
        <Dialog open={dialogIsOpen('EDIT')} onOpenChange={(open) => !open && closeDialog()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Section</DialogTitle>
                    <DialogDescription>
                        Edit the section details below.
                    </DialogDescription>
                </DialogHeader>
                <EditSectionDetailsForm section={section} />
            </DialogContent>
        </Dialog>
    );
}