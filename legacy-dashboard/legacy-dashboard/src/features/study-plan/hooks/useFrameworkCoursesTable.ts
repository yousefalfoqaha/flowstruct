import React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {CourseRelation, StudyPlan} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {getFrameworkCoursesTableColumns} from "@/features/study-plan/components/FrameworkCoursesTableColumns.tsx";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";

export type FrameworkCourse = Course & {
    prerequisites: Record<number, CourseRelation>,
    corequisites: number[],
    section: number,
    sectionCode: string
}

type UseFrameworkCoursesTableProps = {
    studyPlan: StudyPlan;
}

export const useFrameworkCoursesTable = ({studyPlan}: UseFrameworkCoursesTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([{id: 'code', desc: false}]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 10,});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const {data: courses} = useCourseList();

    const columns = React.useMemo(
        () =>
            getFrameworkCoursesTableColumns({
                studyPlan: studyPlan,
                courses: courses
            }),
        [courses, studyPlan]
    );

    const frameworkCourses = React.useMemo(() => {
        if (!studyPlan || !courses) return [];

        const rows: FrameworkCourse[] = [];

        studyPlan.sections.forEach((section) => {
            const sectionCode = getSectionCode(section);

            section.courses.forEach(courseId => {
                const course = courses[Number(courseId)];
                if (!course) return;

                const prerequisites = studyPlan.coursePrerequisites[courseId];
                const corequisites = studyPlan.courseCorequisites[courseId];

                rows.push({...course, prerequisites, corequisites, section: section.id, sectionCode: sectionCode});
            });
        });

        return rows;
    }, [studyPlan, courses]);

    const table = useReactTable({
        columns,
        data: frameworkCourses,
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

    return {table};
}