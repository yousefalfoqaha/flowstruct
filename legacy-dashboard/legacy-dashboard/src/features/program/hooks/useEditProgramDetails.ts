import {useQueryClient} from "@tanstack/react-query";
import {editProgramDetails} from "@/features/program/api.ts";
import {programKeys} from "@/features/program/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";

export const useEditProgramDetails = () => {
    const queryClient = useQueryClient();

    return useAppMutation(editProgramDetails, {
        onSuccess: (data) => {
            queryClient.setQueryData(programKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: programKeys.list()});
        },
        successNotification: {message: (data) => `Edited ${getProgramDisplayName(data)} details.`}
    });
};
