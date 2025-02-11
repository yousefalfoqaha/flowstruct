import {DataTable} from "@/components/DataTable.tsx";
import {Course} from "@/types";
import {
    createColumnHelper,
    getCoreRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getPaginatedCourses} from "@/queries/getPaginatedCourses.ts";
import {UseFormReturn} from "react-hook-form";
import {Loader2} from "lucide-react";

type CourseSearchTableProps = {
    courseSearchForm: UseFormReturn<{ code: string, name: string }>;
    showTable: boolean;
    hideTable: () => void;
}

export function CourseSearchResults({courseSearchForm, showTable, hideTable}: CourseSearchTableProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const {data: coursesPage, isPending} = useQuery(
        getPaginatedCourses(showTable, courseSearchForm.getValues(), pagination)
    );

    React.useEffect(() => {
        if (showTable) setPagination({pageIndex: 0, pageSize: 5});
    }, [showTable]);

    const {accessor} = createColumnHelper<Course>();

    const columns = [
        accessor("code", {header: "Code"}),
        accessor("name", {header: "Name"}),
        accessor("creditHours", {header: () => <h1 className="text-nowrap">Credit Hours</h1>}),
        accessor("type", {header: "Type"}),
    ];

    const table = useReactTable({
        columns,
        data: coursesPage?.content ?? [],
        rowCount: coursesPage?.totalCourses,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            pagination,
        },
        pageCount: coursesPage?.totalPages ?? 0,
        onPaginationChange: setPagination,
    });

    if (!showTable) return;

    if (isPending) return <div className="flex justify-center p-16"><Loader2 className="animate-spin"/></div>;

    return (
        <>
            <DataTable table={table}/>

            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    onClick={() => {
                        courseSearchForm.reset();
                        hideTable();
                    }}
                >
                    Clear
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={coursesPage?.page === 0}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={coursesPage?.isLastPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
