import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {createProgramRequest} from "@/features/program/api.ts";

export const useCreateProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProgramRequest,
        onSuccess: (createdProgram: ProgramListItem) => {
            queryClient.setQueryData(
                ["programs"],
                (previous: ProgramListItem[]) => {
                    return [...previous, createdProgram];
                }
            );

            toast({
                description: "Program created successfully",
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