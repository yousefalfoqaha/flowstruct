import React from "react";
import {DataTable} from "@/components/DataTable";
import {Course} from "@/types";
import {
    createColumnHelper,
    getCoreRowModel,
    PaginationState, RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {ChevronLeft, ChevronRight, Loader2} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getPaginatedCourses} from "@/queries/getPaginatedCourses";
import {SelectedCoursesTray} from "@/components/SelectedCoursesTray";

type CourseSearchTableProps = {
    searchQuery: { code: string; name: string };
    showTable: boolean;
};

export function CourseSearchTable({searchQuery, showTable}: CourseSearchTableProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const {data: coursesPage, isFetching, isSuccess} = useQuery(
        getPaginatedCourses(showTable, searchQuery, pagination)
    );

    const {accessor, display} = createColumnHelper<Course>();

    const columns = [
        display({
            id: 'select',
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    disabled={!row.getCanSelect()}
                    aria-label="Select"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        }),
        accessor("code", {
            header: "Code",
        }),
        accessor("name", {
            header: "Name",
        }),
        accessor("creditHours", {
            header: () => <span>Credit Hours</span>,
        }),
        accessor("type", {
            header: "Type",
        }),
    ];

    React.useEffect(() => {
        setPagination({pageIndex: 0, pageSize: 4});
    }, [searchQuery]);

    const table = useReactTable({
        columns,
        data: coursesPage?.content ?? [],
        rowCount: coursesPage?.totalCourses,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {pagination, rowSelection},
        getRowId: row => JSON.stringify(row),
        pageCount: coursesPage?.totalPages ?? 0,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection
    });

    return (
        <div>
            {(isSuccess && showTable) && (
                <>
                    <DataTable table={table}/>
                    <div className="flex space-x-2 pt-4">
                        <div className="flex gap-2 items-center mx-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={coursesPage?.page === 0 || isFetching}
                            >
                                <ChevronLeft/>
                            </Button>
                            <p>
                                {(coursesPage?.page ?? 0) + 1} of {coursesPage?.totalPages}
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={coursesPage?.isLastPage || isFetching}
                            >
                                <ChevronRight/>
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {isFetching && <Loader2 className="animate-spin mx-auto mt-4"/>}

            <SelectedCoursesTray courses={Object.keys(rowSelection).map(course => JSON.parse(course))}
                                 clearSelection={() => setRowSelection({})}/>
        </div>
    );
}
