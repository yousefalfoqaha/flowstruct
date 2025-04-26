import {useSuspenseQuery} from "@tanstack/react-query";
import {ProgramQuery} from "@/features/program/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useProgram = (fallbackProgramId?: number) => {
    const programId = useEntityId({paramKey: 'programId', fallback: fallbackProgramId});
    return useSuspenseQuery(ProgramQuery(programId));
};
