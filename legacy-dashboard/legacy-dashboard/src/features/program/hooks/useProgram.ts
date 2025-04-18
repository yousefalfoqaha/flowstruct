import {useParams} from "@tanstack/react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramQuery} from "@/features/program/queries.ts";
import React from "react";

export const useProgram = (fallbackProgramId?: number) => {
    const params = useParams({strict: false});

    const programId = React.useMemo(() => {
        const fromParams = params.programId ? parseInt(params.programId) : undefined;
        return fromParams || fallbackProgramId;
    }, [params.programId, fallbackProgramId]);

    if (!programId) {
        throw new Error("Cannot use program without a program ID.");
    }

    return useSuspenseQuery(getProgramQuery(programId));
};
