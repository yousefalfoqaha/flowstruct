import {useQueryClient} from "@tanstack/react-query";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {toggleProgramVisibility} from "@/features/program/api.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {Eye, EyeOff} from "lucide-react";
import React from "react";
import {programKeys} from "@/features/program/queries.ts";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";

export const useToggleProgramVisibility = () => {
    const queryClient = useQueryClient();

    return useAppMutation(toggleProgramVisibility, {
        onSuccess: (updatedProgram) => {
            queryClient.setQueryData(
                programKeys.all,
                (previous: ProgramListItem[]) => {
                    return previous.map((program) =>
                        program.id === updatedProgram.id ? {...program, isPrivate: updatedProgram.isPrivate} : program
                    );
                }
            );
        },
        successNotification: {
            title: (data) =>
                `${getProgramDisplayName(data)} is now ${data.isPrivate ? 'hidden' : 'public'}.`,
            message: (data) =>
                `Program's study plans will also be ${data.isPrivate ? 'hidden' : 'public'}.`,
            icon: (data) =>
                React.createElement(data.isPrivate ? EyeOff : Eye, {size: 18}),
        }
    });
}
