import React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    TableOptions,
    Updater,
    useReactTable
} from "@tanstack/react-table";
import {useLocation, useNavigate, useSearch} from "@tanstack/react-router";
import {TableSearchSchema} from "@/shared/schemas.ts";

type useDataTableProps<TData> = Omit<
    TableOptions<TData>,
    | "state"
    | "getCoreRowModel"
    | "autoResetPageIndex"
>;

export const useDataTable = <TData>(props: useDataTableProps<TData>) => {
    const parsedParams = TableSearchSchema.safeParse(useSearch({strict: false}));
    if (!parsedParams.success) {
        throw new Error("useDataTable hook must be used in a route with table search validation");
    }

    const location = useLocation();
    const navigate = useNavigate();
    const params = parsedParams.data;

    const onGlobalFilterChange = React.useCallback(
        (updaterOrValue: Updater<string>) => {
            const newVal = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: string) => string)(params.filter)
                : updaterOrValue;

            navigate({
                search: (prev) => ({
                    ...prev,
                    filter: newVal,
                    page: prev.filter !== newVal && newVal !== '' ? 0 : prev.page
                }),
                to: location.pathname
            }).then(() => {
            });
        },
        [location.pathname, navigate, params.filter]
    );

    const onColumnFilterChange = React.useCallback(
        (updaterOrValue: Updater<ColumnFiltersState>) => {
            const newVal = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: ColumnFiltersState) => ColumnFiltersState)(params.columnFilters)
                : updaterOrValue;

            navigate({
                search: (prev) => ({...prev, columnFilters: newVal}),
                to: location.pathname
            }).then(() => {
            });
        },
        [location.pathname, navigate, params.columnFilters]
    );

    const onPaginationChange = React.useCallback(
        (updaterOrValue: Updater<PaginationState>) => {
            const newVal = typeof updaterOrValue === 'function'
                ? (updaterOrValue as (prev: PaginationState) => PaginationState)({
                    pageIndex: params.page,
                    pageSize: params.size
                })
                : updaterOrValue;

            navigate({
                search: (prev) => ({
                    ...prev,
                    page: newVal.pageIndex,
                    size: newVal.pageSize
                }),
                resetScroll: false,
                to: location.pathname
            }).then(() => {
            });
        },
        [location.pathname, navigate, params.page, params.size]
    );

    return useReactTable({
        ...props,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination: {pageIndex: params.page, pageSize: params.size},
            globalFilter: params.filter,
            columnFilters: params.columnFilters
        },
        onColumnFiltersChange: onColumnFilterChange,
        onGlobalFilterChange: onGlobalFilterChange,
        onPaginationChange: onPaginationChange,
        autoResetPageIndex: false
    });
}
