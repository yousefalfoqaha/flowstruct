import {TableSearchOptions} from "@/shared/types.ts";

export const getDefaultFrameworkCoursesSearchValues = (): TableSearchOptions => ({
    filter: '',
    page: 0,
    size: 7,
    columnFilters: []
});
