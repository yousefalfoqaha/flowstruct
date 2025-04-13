import {useParams} from "@tanstack/react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramQuery} from "@/features/program/queries.ts";

export const useProgram = () => {
    const programId = parseInt(useParams({strict: false}).programId ?? '');

    if (!programId) {
        throw new Error("Cannot use program without a program ID search parameter.");
    }

    return useSuspenseQuery(getProgramQuery(programId));
}