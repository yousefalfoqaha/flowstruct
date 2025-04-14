import {useQueryClient} from "@tanstack/react-query";
import {editProgramDetails} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {programKeys} from "@/features/program/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";

export const useEditProgramDetails = () => {
    const queryClient = useQueryClient();

    return useAppMutation(editProgramDetails, {
        onSuccess: (editedProgram) => {
            queryClient.setQueryData(programKeys.detail(editedProgram.id), editedProgram);

            queryClient.setQueryData(
                programKeys.all,
                (previous: ProgramListItem[]) => {
                    if (!previous) return;
                    return previous.map((program) =>
                        program.id === editedProgram.id ? editedProgram : program
                    );
                }
            );
        },
        successNotification: {message: (data) => `Edited ${getProgramDisplayName(data)} details successfully.`}
    });
};
