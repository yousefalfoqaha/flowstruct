import {useParams} from "@tanstack/react-router";
import React from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getCourseQuery} from "@/features/course/queries.ts";

export const useCourse = (fallbackId?: number) => {
    const params = useParams({strict: false});

    const courseId = React.useMemo(() => {
        const fromParams = params.courseId ? parseInt(params.courseId) : undefined;
        return fromParams || fallbackId;
    }, [params.courseId, fallbackId]);

    if (!courseId) {
        throw new Error("Cannot use course without course ID.");
    }

    return useSuspenseQuery(getCourseQuery(courseId));
}