import {ActionIcon, Checkbox, Group} from "@mantine/core";
import {ArrowDownUp} from "lucide-react";
import {SectionsCombobox} from "@/features/study-plan/components/SectionsCombobox.tsx";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {FrameworkCourse, StudyPlan} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {PrerequisitePillGroup} from "@/features/study-plan/components/PrerequisitePillGroup.tsx";

type FrameworkCoursesTableColumnsProps = {
    studyPlan: StudyPlan;
    courses: Record<number, Course>;
}

export function getFrameworkCoursesTableColumns({
                                                    studyPlan,
                                                    courses
                                                }: FrameworkCoursesTableColumnsProps): ColumnDef<FrameworkCourse>[] {
    const columnHelper = createColumnHelper<FrameworkCourse>();

    return [
        columnHelper.display({
            id: 'selection',
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        }),
        columnHelper.accessor("code", {
            header: ({column}) => (
                <Group wrap="nowrap">
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ArrowDownUp size={14}/>
                    </ActionIcon>
                    Code
                </Group>
            ),
            sortingFn: 'alphanumeric',
            cell: ({row}) => (
                <p>{row.original.code}</p>
            ),
        }),
        columnHelper.accessor("name", {
            header: ({column}) => (
                <Group wrap="nowrap">
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ArrowDownUp size={14}/>
                    </ActionIcon>
                    Name
                </Group>
            ),
            cell: ({row}) => <p>{row.original.name}</p>,
            sortingFn: 'alphanumeric'
        }),
        columnHelper.accessor("creditHours", {
            header: 'Credits',
            sortingFn: 'alphanumeric',
            cell: ({row}) => (
                <p>{row.original.creditHours} Cr.</p>
            )
        }),
        columnHelper.display({
            id: "prerequisites",
            header: "Prerequisites / Corequisites",
            cell: ({row}) => (
                <PrerequisitePillGroup parentCourseId={row.original.id} courses={courses} studyPlan={studyPlan}/>
            ),
        }),
        columnHelper.display({
            id: "section",
            header: "Section",
            enableColumnFilter: true,
            cell: ({row}) => {
                return (
                    <SectionsCombobox
                        sectionId={row.original.section}
                        sections={studyPlan.sections}
                        studyPlanId={studyPlan.id}
                        courseId={row.original.id}
                        courseSectionCode={row.original.sectionCode}
                    />
                );
            },
            filterFn: (row, _, filterValue: number) => {
                return row.original.section === filterValue
            },
        }),
    ];
}
