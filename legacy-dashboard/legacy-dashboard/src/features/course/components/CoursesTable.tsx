import {AppCard} from "@/shared/components/AppCard.tsx";
import {usePaginatedCourses} from "@/features/course/hooks/usePaginatedCourses.ts";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {Course} from "@/features/course/types.ts";
import React from "react";
import {getCoursesTableColumns} from "@/features/course/components/CoursesTableColumns.tsx";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Button, Stack} from "@mantine/core";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Plus} from "lucide-react";
import {Link} from "@tanstack/react-router";

export function CoursesTable() {
    const {data: coursesPage} = usePaginatedCourses();

    const columns = React.useMemo(
        () => getCoursesTableColumns(),
        []
    );

    const data: Course[] = React.useMemo(
        () => coursesPage?.content ?? [],
        [coursesPage?.content]
    );

    const table = useDataTable<Course>({
        data,
        columns,
        manualPagination: true,
        manualFiltering: true,
        pageCount: coursesPage?.totalPages,
        rowCount: coursesPage?.totalCourses
    });

    return (
        <Stack>
            <DataTableSearch table={table} debounce={750}/>

            <AppCard
                title="All Courses"
                subtitle="Manage all university courses"
                headerAction={
                    <Link to="/courses/new">
                        <Button leftSection={<Plus size={18}/>}>
                            Create New Course
                        </Button>
                    </Link>
                }
            >
                <DataTable table={table}/>
            </AppCard>

            <DataTablePagination table={table}/>
        </Stack>
    );
}
