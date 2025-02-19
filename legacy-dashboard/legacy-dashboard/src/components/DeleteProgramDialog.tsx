import {ProgramOption} from "@/types";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ToastAction} from "@/components/ui/toast.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {useDialog} from "@/hooks/useDialog.ts";

export function DeleteProgramDialog() {
    const queryClient = useQueryClient();
    const {dialogIsOpen, item: program, closeDialog} = useDialog<ProgramOption>();

    const {toast} = useToast();

    const mutation = useMutation({
        mutationFn: async (deletedProgram: ProgramOption | null) => {
            const response = await fetch(`http://localhost:8080/api/v1/programs/${deletedProgram?.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }
        },
        onSuccess: (_, deletedProgram) => {
            queryClient.setQueryData(['programs'], (programs: ProgramOption[] | undefined) => {
                if (!programs) return [];
                return programs.filter(p => p.id !== deletedProgram?.id);
            });

            closeDialog();

            toast({description: "Program deleted successfully."});
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'An error occurred while trying to delete the program.',
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
        }
    });

    return (
        <Dialog open={dialogIsOpen('DELETE')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {program?.name} Program</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {mutation.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit" variant="destructive" onClick={() => mutation.mutate(program)}>
                            <Trash/> Delete Program
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}