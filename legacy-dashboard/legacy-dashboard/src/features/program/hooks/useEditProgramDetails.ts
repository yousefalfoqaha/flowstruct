import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editProgramDetailsRequest} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {notifications} from "@mantine/notifications";

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

            notifications.show({
                title: "Success!",
                message: "Program details updated successfully",
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