import {useSuspenseQuery} from "@tanstack/react-query";
import {CourseQuery} from "@/features/course/queries.ts";
import {useEntityId} from "@/shared/hooks/useEntityId.ts";

export const useCourse = (fallbackId?: number) => {
    const courseId = useEntityId('courseId', fallbackId);
    return useSuspenseQuery(CourseQuery(courseId));
}