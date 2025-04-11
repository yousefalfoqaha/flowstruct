import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {Book, Loader2, Pencil, Trash} from "lucide-react";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Link} from "@tanstack/react-router";
import {ProgramListItem} from "@/features/program/types.ts";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {modals} from "@mantine/modals";
import {EditProgramDetailsModal} from "@/features/program/components/EditProgramDetailsModal.tsx";
import {ActionIcon, Badge, Button, Text} from "@mantine/core";
import {useDeleteProgram} from "@/features/program/hooks/useDeleteProgram.ts";
import React from "react";
import {getProgramsTableColumns} from "@/features/program/components/ProgramsTableColumns.tsx";

export function ProgramsTable() {
    const {accessor, display} = createColumnHelper<ProgramListItem>();


    const columns = React.useMemo(
        () => getProgramsTableColumns(), [])

    const {isPending, data} = useProgramList();

    const table = useReactTable({
        columns: columns,
        data: data ?? [],
        getCoreRowModel: getCoreRowModel()
    });

    if (isPending) return <div className="p-10"><Loader2 className="animate-spin text-gray-500 mx-auto"/></div>

    return (
        <DataTable table={table}/>
    );
}