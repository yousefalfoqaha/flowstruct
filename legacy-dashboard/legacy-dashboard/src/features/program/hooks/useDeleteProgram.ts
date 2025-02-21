import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {deleteProgramRequest} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (programId: number) => deleteProgramRequest(programId),
        onSuccess: (_, deletedProgramId) => {
            queryClient.setQueryData(
                ["programs"],
                (previous: ProgramListItem[]) => {
                    previous.filter((program) => program.id !== deletedProgramId);
                }
            );

            queryClient.removeQueries({queryKey: ["study-plans", deletedProgramId]});

            toast({
                description: "Program deleted successfully",
                variant: "default",
            });
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: "destructive",
            });
        },
    });
}