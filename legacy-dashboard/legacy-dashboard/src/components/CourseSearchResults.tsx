import {DataTable} from "@/components/DataTable.tsx";
import {Course} from "@/types";
import {
    createColumnHelper,
    getCoreRowModel,
    PaginationState, RowSelectionState,
    useReactTable
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getPaginatedCourses} from "@/queries/getPaginatedCourses.ts";
import {UseFormReturn} from "react-hook-form";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type CourseSearchTableProps = {
    courseSearchForm: UseFormReturn<{ code: string, name: string }>;
    showTable: boolean;
    hideTable: () => void;
}

export function CourseSearchResults({courseSearchForm, showTable, hideTable}: CourseSearchTableProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({pageIndex: 0, pageSize: 4});
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);

    const {data: coursesPage} = useQuery(
        getPaginatedCourses(showTable, courseSearchForm.watch(), pagination)
    );

    const {accessor, display} = createColumnHelper<Course>();

    // fetch course with useQuery once selected

    const columns = [
        display({
            id: "select",
            cell: ({row}) => {
                const isSelected = selectedCourses.includes(row.original);
                if (isSelected) {
                    row.toggleSelected(!!isSelected);
                }

                return <Checkbox
                    checked={row.getIsSelected() || isSelected}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);

                        if (row.getIsSelected()) {
                            setSelectedCourses(selectedCourses.filter(c => c.id !== row.original.id));
                            return;
                        }

                        setSelectedCourses([...selectedCourses, row.original]);
                    }}
                    aria-label="Select"
                />
            },
            enableSorting: false,
            enableHiding: false,
        }),
        accessor("code", {
            header: "Code"
        }),
        accessor("name", {
            header: "Name"
        }),
        accessor("creditHours", {
            header: () => <h1 className="text-nowrap">Credit Hours</h1>
        }),
        accessor("type", {
            header: "Type"
        }),
    ];

    React.useEffect(() => {
        if (showTable) {
            setPagination({pageIndex: 0, pageSize: 5});
            setRowSelection({});
        }
    }, [showTable]);


    const table = useReactTable({
        columns,
        data: coursesPage?.content ?? [],
        rowCount: coursesPage?.totalCourses,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            pagination,
            rowSelection
        },
        pageCount: coursesPage?.totalPages ?? 0,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection
    });

    // if (isPending) return <div className="flex justify-center p-16"><Loader2 className="animate-spin"/></div>;

    return (
        <>
            {showTable && (
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
                                onClick={() => {
                                    table.previousPage();
                                    setRowSelection({});
                                }}
                                disabled={coursesPage?.page === 0}
                            >
                                Previous
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    table.nextPage();
                                    setRowSelection({});
                                }}
                                disabled={coursesPage?.isLastPage}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </>
            )}
            <div>
                <h1>Selected courses:</h1>
                {selectedCourses.map(course => {
                    return <div key={course.id}>{course.name}</div>
                })}
            </div>
        </>
    );
}
