import {AppCard} from "@/shared/components/AppCard.tsx";
import {usePaginatedCourseList} from "@/features/course/hooks/usePaginatedCourseList.ts";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {CourseSummary} from "@/features/course/types.ts";
import React from "react";
import {getCoursesTableColumns} from "@/features/course/components/CoursesTableColumns.tsx";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Button, Group, Loader, LoadingOverlay, Stack} from "@mantine/core";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Plus} from "lucide-react";
import {Link} from "@tanstack/react-router";

export function CoursesTable() {
    const {data: coursesPage, isFetching, isPending} = usePaginatedCourseList();

    const columns = React.useMemo(
        () => getCoursesTableColumns(),
        []
    );

    const data: CourseSummary[] = React.useMemo(
        () => coursesPage?.content ?? [],
        [coursesPage?.content]
    );

    const table = useDataTable<CourseSummary>({
        data,
        columns,
        manualPagination: true,
        manualFiltering: true,
        pageCount: coursesPage?.totalPages,
        rowCount: coursesPage?.totalCourses
    });

    return (
        <Stack>
            <Group justify="space-between">
                <DataTableSearch table={table} debounce={750}/>
                <Loader mr="lg" size={18} opacity={isFetching ? 100 : 0}/>
            </Group>

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
                <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{radius: "sm"}}/>
                <DataTable table={table}/>
            </AppCard>

            <DataTablePagination table={table}/>
        </Stack>
    );
}
