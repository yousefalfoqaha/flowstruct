import React from "react";
import { DataTable } from "@/components/DataTable.tsx";
import { Course } from "@/types";
import {
    createColumnHelper,
    getCoreRowModel,
    PaginationState,
    RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { SelectedCoursesTray } from "@/components/SelectedCoursesTray.tsx";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedCourses } from "@/queries/getPaginatedCourses.ts";
import {ChevronLeft, ChevronRight} from "lucide-react";

type CourseSearchTableProps = {
    courseSearchForm: UseFormReturn<{ code: string; name: string }>;
    showTable: boolean;
    hideTable: () => void;
};

export function CourseSearchResults({ courseSearchForm, showTable }: CourseSearchTableProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 4 });
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [selectedCoursesMap, setSelectedCoursesMap] = React.useState<Map<string, Course>>(new Map());

    const { data: coursesPage } = useQuery(
        getPaginatedCourses(showTable, courseSearchForm.watch(), pagination)
    );

    const { accessor, display } = createColumnHelper<Course>();

    const updateExternalSelection = (course: Course, isSelected: boolean) => {
        setSelectedCoursesMap((prev) => {
            const newMap = new Map(prev);

            if (isSelected) {
                newMap.set(String(course.id), course);
            } else {
                newMap.delete(String(course.id));
            }

            return newMap;
        });
    };

    const columns = [
        display({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => {
                        const isSelected = !!value;
                        table.toggleAllPageRowsSelected(isSelected);

                        table.getRowModel().rows.forEach((row) => {
                            updateExternalSelection(row.original, isSelected);
                        });
                    }}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        const isSelected = !!value;
                        row.toggleSelected(isSelected);
                        updateExternalSelection(row.original, isSelected);
                    }}
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
            header: () => <h1 className="text-nowrap">Credit Hours</h1>,
        }),
        accessor("type", {
            header: "Type",
        }),
    ];

    React.useEffect(() => {
        if (showTable) {
            setPagination({ pageIndex: 0, pageSize: 5 });
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
            rowSelection,
        },
        getRowId: (row) => String(row.id),
        pageCount: coursesPage?.totalPages ?? 0,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
    });

    return (
        <>
            {showTable && (
                <div>
                    <DataTable table={table} />

                    <div className="flex space-x-2 pt-4">
                        <div className="flex gap-2 items-center mx-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    table.previousPage();
                                }}
                                disabled={coursesPage?.page === 0}
                            >
                                <ChevronLeft />
                            </Button>
                            <p>{(coursesPage?.page ?? 0) + 1} of {coursesPage?.totalPages}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    table.nextPage();
                                }}
                                disabled={coursesPage?.isLastPage}
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <SelectedCoursesTray
                clearSelection={() => {
                    setRowSelection({});
                    setSelectedCoursesMap(new Map());
                }}
                selectedCourses={[...selectedCoursesMap.values()]}
            />
        </>
    );
}
