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
    useReactTable,
} from "@tanstack/react-table";
import {useLocation, useNavigate, useSearch} from "@tanstack/react-router";
import {TableSearchSchema,} from "@/shared/schemas";

type useDataTableProps<TData> = Omit<
    TableOptions<TData>,
    | "state"
    | "getCoreRowModel"
    | "autoResetPageIndex"
>;

export const useDataTable = <TData>(
    props: useDataTableProps<TData>,
    searchSchema = TableSearchSchema
) => {
    const rawSearch = useSearch({strict: false});
    const parsed = searchSchema.safeParse(rawSearch);
    if (!parsed.success) {
        throw new Error(
            "useDataTable hook must be used in a route with a compatible table‑search schema"
        );
    }
    const params = parsed.data;

    const location = useLocation();
    const navigate = useNavigate();

    const onGlobalFilterChange = React.useCallback(
        (updaterOrValue: Updater<string>) => {
            const next = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: string) => string)(params.filter)
                : updaterOrValue;

            navigate({
                to: location.pathname,
                search: (prev) => ({
                    ...prev,
                    filter: next,
                    page: prev.filter !== next && next !== "" ? 0 : prev.page,
                }),
            });
        },
        [location.pathname, navigate, params.filter]
    );

    const onColumnFilterChange = React.useCallback(
        (updaterOrValue: Updater<ColumnFiltersState>) => {
            const next = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: ColumnFiltersState) => ColumnFiltersState)(
                    params.columnFilters
                )
                : updaterOrValue;

            navigate({
                to: location.pathname,
                search: (prev) => ({
                    ...prev,
                    columnFilters: next,
                }),
            });
        },
        [location.pathname, navigate, params.columnFilters]
    );

    const onPaginationChange = React.useCallback(
        (updaterOrValue: Updater<PaginationState>) => {
            const next =
                typeof updaterOrValue === "function"
                    ? (updaterOrValue as (prev: PaginationState) => PaginationState)({
                        pageIndex: params.page,
                        pageSize: params.size,
                    })
                    : updaterOrValue;

            navigate({
                to: location.pathname,
                search: (prev) => ({
                    ...prev,
                    page: next.pageIndex,
                    size: next.pageSize,
                }),
                resetScroll: false,
            });
        },
        [location.pathname, navigate, params.page, params.size]
    );

    return useReactTable({
        ...props,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter: params.filter,
            columnFilters: params.columnFilters,
            pagination: {
                pageIndex: params.page,
                pageSize: params.size,
            },
        },
        onGlobalFilterChange,
        onColumnFiltersChange: onColumnFilterChange,
        onPaginationChange,
        autoResetPageIndex: false,
    });
}
