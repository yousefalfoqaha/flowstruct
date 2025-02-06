import {StudyPlanOption} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";

type DeleteStudyPlanDialogProps = {
    studyPlan: StudyPlanOption | null;
    closeDialog: () => void;
}

export function DeleteStudyPlanDialog({studyPlan, closeDialog}:DeleteStudyPlanDialogProps) {
    const queryClient = useQueryClient();

    const {toast} = useToast();

    const deleteStudyPlanMutation = useMutation({
        mutationFn: async (deletedStudyPlan: StudyPlanOption | null) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${deletedStudyPlan?.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }
        },
        onSuccess: (_, deletedStudyPlan) => {
            queryClient.setQueryData(['programs', studyPlan?.program], (studyPlans: StudyPlanOption[] | undefined) => {
                if (!studyPlans) return [];
                return studyPlans.filter(p => p.id !== deletedStudyPlan?.id);
            });

            closeDialog();

            toast({description: "Study plan deleted successfully."});
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'An error occurred while trying to delete the study plan.',
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
        }
    });

    if (!studyPlan) return;

    return (
        <Dialog open={!!studyPlan} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track ?? ''}</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {deleteStudyPlanMutation.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit" variant="destructive" onClick={() => deleteStudyPlanMutation.mutate(studyPlan)}>
                            <Trash/> Delete Study Plan
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}