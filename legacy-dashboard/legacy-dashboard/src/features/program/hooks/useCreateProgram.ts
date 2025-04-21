import {useQueryClient} from "@tanstack/react-query";
import {ProgramListItem} from "@/features/program/types.ts";
import {createProgram} from "@/features/program/api.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {programKeys} from "@/features/program/queries.ts";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";

export const useCreateProgram = () => {
    const queryClient = useQueryClient();
    return useAppMutation(createProgram, {
        onSuccess: (createdProgram) => {
            queryClient.setQueryData(
                programKeys.all,
                (previous: ProgramListItem[]) => {
                    return [...previous, createdProgram];
                }
            );
        },
        successNotification: {message: (data) => `${getProgramDisplayName(data)} was created successfully.`}
    });
};
