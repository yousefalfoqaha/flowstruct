import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {useDeleteProgram} from "@/features/program/hooks/useDeleteProgram.ts";
import {ProgramListItem} from "@/features/program/types.ts";

export function DeleteProgramDialog() {
    const {dialogIsOpen, item: program, closeDialog} = useDialog<ProgramListItem>();
    const deleteProgram = useDeleteProgram();

    if (!program) return;

    return (
        <Dialog open={dialogIsOpen('DELETE')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {program.name} Program</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center">
                    {deleteProgram.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit"
                                  variant="destructive"
                                  onClick={() => deleteProgram.mutate(program.id)}>
                            <Trash/> Delete Program
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}