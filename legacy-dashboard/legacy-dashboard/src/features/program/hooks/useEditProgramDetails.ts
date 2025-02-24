import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts"
import {editProgramDetailsRequest} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";

export const useEditProgramDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProgramDetailsRequest,
        onSuccess: (editedProgram: ProgramListItem) => {
            queryClient.setQueryData(
                ["programs"],
                (previous: ProgramListItem[]) => {
                    return previous.map((program) =>
                        program.id === editedProgram.id ? editedProgram : program
                    );
                }
            );

            toast({
                description: "Program updated successfully",
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
};