import {createColumnHelper} from "@tanstack/react-table";
import {ProgramSummary} from "@/features/program/types.ts";
import {ProgramOptionsMenu} from "@/features/program/components/ProgramOptionsMenu.tsx";
import {Badge} from "@mantine/core";
import {Eye, EyeOff} from "lucide-react";
import classes from "./StatusBadge.module.css";

export function getProgramsTableColumns() {
    const {display, accessor} = createColumnHelper<ProgramSummary>();

    return [
        accessor('code', {
            header: 'Code',
            cell: ({cell}) => <Badge variant="default">{cell.getValue()}</Badge>
        }),
        accessor('name', {
            header: 'Name'
        }),
        accessor('degree', {
            header: 'Degree',
            enableColumnFilter: true,
            filterFn: 'equalsString'
        }),
        accessor('isPrivate', {
            header: 'Status',
            cell: ({row}) => (
                row.original.isPrivate ? (
                    <Badge variant="outline" classNames={{root: classes.root}}
                           leftSection={<EyeOff size={14}/>}>Hidden</Badge>
                ) : (
                    <Badge variant="light" classNames={{root: classes.root}}
                           leftSection={<Eye size={14}/>}>Public</Badge>
                )
            ),
        }),
        display({
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => (
                <ProgramOptionsMenu program={row.original}/>
            ),
        }),
    ];
}
