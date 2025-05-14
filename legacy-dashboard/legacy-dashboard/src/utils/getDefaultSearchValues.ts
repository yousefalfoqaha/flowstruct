import {TableSearchOptions} from "@/shared/types.ts";

export const getDefaultSearchValues = (): TableSearchOptions => ({
    filter: '',
    page: 0,
    size: 10,
    columnFilters: []
});