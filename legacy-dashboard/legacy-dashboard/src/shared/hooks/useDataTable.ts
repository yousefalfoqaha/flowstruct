import React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
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
    const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 10,});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const onGlobalFilterChange = React.useCallback(
        (updaterOrValue: Updater<string>) => {
            const newVal = typeof updaterOrValue === "function"
                ? (updaterOrValue as (prev: string) => string)(params.filter)
                : updaterOrValue;

            navigate({
                search: (prev) => ({...prev, filter: newVal}),
                to: location.pathname
            }).then(() => {});
        },
        [location.pathname, navigate, params.filter]
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
            pagination,
            sorting,
            rowSelection,
            globalFilter: params.filter,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: onGlobalFilterChange,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });
}
