import {useQueryClient} from "@tanstack/react-query";
import {ProgramListItem} from "@/features/program/types.ts";
import {createProgram} from "@/features/program/api.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useCreateProgram = () => {
    const queryClient = useQueryClient();
    return useAppMutation(createProgram, {
        onSuccess: (createdProgram: ProgramListItem) => {
            queryClient.setQueryData(
                ["programs"],
                (previous: ProgramListItem[]) => {
                    return [...previous, createdProgram];
                }
            );
        },
        successNotification: {message: "Program created successfully."}
    });
};
