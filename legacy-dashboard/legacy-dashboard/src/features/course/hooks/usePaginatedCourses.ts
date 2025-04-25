import {useQuery} from "@tanstack/react-query";
import {PaginatedCoursesQuery} from "@/features/course/queries.ts";
import {useSearch} from "@tanstack/react-router";
import {TableSearchSchema} from "@/shared/schemas.ts";

export const usePaginatedCourses = () => {
    const parsedParams = TableSearchSchema.safeParse(useSearch({strict: false}));
    if (!parsedParams.success) {
        throw new Error("useDataTable hook must be used in a route with table search validation");
    }

    const params = parsedParams.data;

    return useQuery(PaginatedCoursesQuery(params));
}
