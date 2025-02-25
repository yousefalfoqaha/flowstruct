import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProgramRequest} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {notifications} from "@mantine/notifications";

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (programId: number) => deleteProgramRequest(programId),
        onSuccess: (_, deletedProgramId) => {
            queryClient.setQueryData(
                ["programs"],
                (previous: ProgramListItem[]) => {
                    return previous.filter((program) => program.id !== deletedProgramId);
                }
            );

            queryClient.removeQueries({queryKey: ["study-plans", "list", deletedProgramId]});

            notifications.show({
                title: "Success!",
                message: "Program deleted successfully",
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
}