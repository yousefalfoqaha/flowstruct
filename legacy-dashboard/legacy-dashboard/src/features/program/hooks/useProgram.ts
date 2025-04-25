import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramQuery} from "@/features/program/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useProgram = (fallbackProgramId?: number) => {
    const programId = useEntityId('programId', fallbackProgramId);
    return useSuspenseQuery(getProgramQuery(programId));
};
