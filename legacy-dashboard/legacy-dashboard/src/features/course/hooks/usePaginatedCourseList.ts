import {useQuery} from "@tanstack/react-query";
import {PaginatedCourseListQuery} from "@/features/course/queries.ts";
import {useSearch} from "@tanstack/react-router";
import {TableSearchSchema} from "@/shared/schemas.ts";

export const usePaginatedCourseList = () => {
    const parsedParams = TableSearchSchema.safeParse(useSearch({strict: false}));

    if (!parsedParams.success) {
        throw new Error("useDataTable hook must be used in a route with table search validation");
    }

    const params = parsedParams.data;

    return useQuery(PaginatedCourseListQuery(params));
}
