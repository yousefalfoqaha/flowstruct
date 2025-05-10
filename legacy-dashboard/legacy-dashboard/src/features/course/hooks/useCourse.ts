import {useSuspenseQuery} from "@tanstack/react-query";
import {CourseQuery} from "@/features/course/queries.ts";
import {useParamId} from "@/shared/hooks/useParamId.ts";

export const useCourse = (fallbackId?: number) => {
    const courseId = useParamId({paramKey: 'courseId', fallback: fallbackId});
    return useSuspenseQuery(CourseQuery(courseId));
}
