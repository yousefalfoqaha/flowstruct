import React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel, PaginationState,
    RowSelectionState,
    SortingState,
    TableOptions,
    Updater,
    useReactTable
} from "@tanstack/react-table";
import {useLocation, useNavigate, useSearch} from "@tanstack/react-router";

type useDataTableProps<TData> = Omit<
    TableOptions<TData>,
    | "state"
    | "pageCount"
    | "getCoreRowModel"
    | "manualFiltering"
    | "manualPagination"
    | "manualSorting"
>;

export const useDataTable = <TData>({columns, data}: useDataTableProps<TData>) => {
    const params = useSearch({from: "__root__"});
    const location = useLocation();
    const navigate = useNavigate();

    const [sorting, setSorting] = React.useState<SortingState>([{id: 'code', desc: false}]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const onGlobalFilterChange = React.useCallback(
        (updaterOrValue: Updater<string>) => {
            const newVal = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: string) => string)(params.filter)
                : updaterOrValue;

            navigate({
                search: (prev) => ({...prev, filter: newVal}),
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
                to: location.pathname
            });
        },
        [location.pathname, navigate, params.page, params.size]
    );

    return useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            pagination: {pageIndex: params.page, pageSize: params.size},
            sorting,
            rowSelection,
            globalFilter: params.filter,
            columnFilters: params.columnFilters
        },
        onColumnFiltersChange: onColumnFilterChange,
        onGlobalFilterChange: onGlobalFilterChange,
        onPaginationChange: onPaginationChange,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });
}
