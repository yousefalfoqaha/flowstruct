import {ActionIcon, Badge, Checkbox, Group} from "@mantine/core";
import {ArrowDownUp} from "lucide-react";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {FrameworkCourse} from "@/features/study-plan/types.ts";
import {PrerequisitePillGroup} from "@/features/study-plan/components/PrerequisitePillGroup.tsx";
import {FrameworkCourseOptionsMenu} from "@/features/study-plan/components/FrameworkCourseOptionsMenu.tsx";

export function getFrameworkCoursesTableColumns(): ColumnDef<FrameworkCourse>[] {
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
                <Badge variant="default">{row.original.code}</Badge>
            ),
        }) as ColumnDef<FrameworkCourse>,

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
            sortingFn: 'alphanumeric',
        }) as ColumnDef<FrameworkCourse>,

        columnHelper.accessor("creditHours", {
            header: 'Credits',
            sortingFn: 'alphanumeric',
            cell: ({row}) => (
                <p>{row.original.creditHours} Cr.</p>
            )
        }) as ColumnDef<FrameworkCourse>,

        columnHelper.display({
            id: "prerequisites",
            header: "Prerequisites / Corequisites",
            cell: ({row}) => (
                <PrerequisitePillGroup parentCourseId={row.original.id}/>
            ),
        }),

        columnHelper.accessor('section', {
            header: 'Section',
            cell: ({row}) => row.original.sectionCode,
            sortingFn: 'alphanumeric',
            enableColumnFilter: true,
            filterFn: (row, _, filterValue: number[]) => {
                return filterValue.includes(row.original.section);
            }
        }) as ColumnDef<FrameworkCourse>,

        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({row}) => (
                <FrameworkCourseOptionsMenu
                    course={row.original}
                    sectionId={row.original.section}
                />
            ),
        }),
    ];
}
