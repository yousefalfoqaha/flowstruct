import {Section, StudyPlan} from "@/types";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ToastAction} from "@/components/ui/toast.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {useParams} from "@tanstack/react-router";

type DeleteProgramDialogProps = {
    section: Section | null;
    closeDialog: () => void;
}

export function DeleteSectionDialog({section, closeDialog}: DeleteProgramDialogProps) {
    const queryClient = useQueryClient();
    const {toast} = useToast();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    const mutation = useMutation({
        mutationFn: async (deletedSection: Section | null) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${deletedSection?.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
            closeDialog();
            toast({description: 'Successfully deleted section.'});
        }),
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'An error occurred while trying to delete the section.',
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
        }
    });

    return (
        <Dialog open={!!section} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {section?.level} {section?.type} {section?.name ? `- ${section?.name}` : ""}</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {mutation.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit" variant="destructive" onClick={() => mutation.mutate(section)}>
                            <Trash/> Delete Section
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}