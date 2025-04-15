import React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    RowSelectionState,
    SortingState, TableOptions,
    useReactTable
} from "@tanstack/react-table";

type useDataTableProps<TData> =  Omit<
    TableOptions<TData>,
    | "state"
    | "pageCount"
    | "getCoreRowModel"
    | "manualFiltering"
    | "manualPagination"
    | "manualSorting"
>

export const useDataTable = <TData>(props: useDataTableProps<TData>) => {
    const {columns, data} = props;

    const [sorting, setSorting] = React.useState<SortingState>([{id: 'code', desc: false}]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 10,});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    // use search params as table state parameters

    const table = useReactTable({
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
            globalFilter,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });

    return table;
}
