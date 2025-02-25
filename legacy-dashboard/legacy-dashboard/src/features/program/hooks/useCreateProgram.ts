import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProgramListItem} from "@/features/program/types.ts";
import {createProgramRequest} from "@/features/program/api.ts";
import {notifications} from "@mantine/notifications";

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

            notifications.show({
                title: "Success!",
                message: "Program created successfully",
                color: "green"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                color: "red",
            });
        },
    });
};