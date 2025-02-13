import React from "react";
import {DataTable} from "@/components/DataTable.tsx";
import {Course} from "@/types";
import {createColumnHelper, getCoreRowModel, PaginationState, useReactTable,} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {SelectedCoursesTray} from "@/components/SelectedCoursesTray.tsx";
import {useQuery} from "@tanstack/react-query";
import {getPaginatedCourses} from "@/queries/getPaginatedCourses.ts";
import {ChevronLeft, ChevronRight, Loader2} from "lucide-react";
import {useSelectedCourses} from "@/hooks/useSelectedCourses.ts";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";

type CourseSearchTableProps = {
    searchQuery: { code: string; name: string };
    showTable: boolean;
    semester: number;
};

export function CourseSearchResults({searchQuery, showTable, semester}: CourseSearchTableProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({pageIndex: 0, pageSize: 4});
    const {rowSelection, setRowSelection} = useSelectedCourses();
    const {studyPlanId} = useParams({strict: false});
    const {data: studyPlan} = useStudyPlan(parseInt(studyPlanId ?? ''));

    const {data: coursesPage, isFetching, isSuccess} = useQuery(
        getPaginatedCourses(showTable, searchQuery, pagination)
    );

    const {accessor, display} = createColumnHelper<Course>();

    const columns = [
        display({
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
            header: () => <h1 className="text-nowrap">Credit Hours</h1>,
        }),
        accessor("type", {
            header: "Type",
        }),
    ];

    React.useEffect(() => {
        if (searchQuery) {
            setPagination({pageIndex: 0, pageSize: 4});
        }
    }, [searchQuery]);

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
        getRowId: (row) => JSON.stringify(row),
        pageCount: coursesPage?.totalPages ?? 0,
        onPaginationChange: setPagination,
        enableRowSelection: row => {
            const course = row.original;

            if (studyPlan.coursePlacements[course.id]) return false;

            return course.prerequisites.every(prerequisite => {
                const prerequisitePlacement = studyPlan.coursePlacements[prerequisite.prerequisite];
                return prerequisitePlacement && prerequisitePlacement < semester; // Only select if prerequisites are taken before the current semester
            });
        },
        onRowSelectionChange: setRowSelection,
    });

    return (
        <>
            {(showTable && isSuccess) && (
                <div>
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
                            <p>{(coursesPage?.page ?? 0) + 1} of {coursesPage?.totalPages}</p>
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
                </div>
            )}

            {isFetching && <Loader2 className="animate-spin mx-auto mt-4"/>}

            <SelectedCoursesTray clearSelection={() => setRowSelection({})} />
        </>
    );

}
