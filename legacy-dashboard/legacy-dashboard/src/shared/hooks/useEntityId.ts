import {RegisteredRouter, useParams} from "@tanstack/react-router"
import React from "react";

type AllRouteParams = ReturnType<typeof useParams<RegisteredRouter, undefined, false>>;
type ParamKeyUnion = keyof AllRouteParams;

export const useEntityId = <K extends ParamKeyUnion>(
    paramKey: K,
    fallbackId?: number
) => {
    const params = useParams<RegisteredRouter, undefined, false>({strict: false});

    const id = React.useMemo(() => {
        const raw = params[paramKey]
        const parsed = raw != null ? parseInt(raw, 10) : undefined
        return parsed ?? fallbackId
    }, [params, paramKey, fallbackId]);

    if (id == null) throw new Error(`Missing ${String(paramKey)} ID in URL and no fallback provided`)

    return id;
}
