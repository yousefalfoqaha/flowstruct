import React from "react";
import {ProgramOption} from "@/types";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Book, Loader2, Pencil, Trash} from "lucide-react";
import {DataTable} from "@/components/DataTable.tsx";
import {EditProgramDialog} from "@/components/EditProgramDialog.tsx";
import {DeleteProgramDialog} from "@/components/DeleteProgramDialog.tsx";
import {Link} from "@tanstack/react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getPrograms} from "@/queries/getPrograms.ts";

enum ProgramDialog {
    Edit = 'edit',
    Delete = 'delete'
}

export function ProgramsTable() {
    const [selectedProgram, setSelectedProgram] = React.useState<ProgramOption | null>(null);
    const [programDialog, setProgramDialog] = React.useState<ProgramDialog | null>(null);

    const closeDialog = () => {
        setSelectedProgram(null);
        setProgramDialog(null);
    }

    const openDialog = (program: ProgramOption, dialog: ProgramDialog) => {
        setSelectedProgram(program);
        setProgramDialog(dialog);
    }

    const {accessor, display} = createColumnHelper<ProgramOption>();

    const columns = [
        display({
            id: 'study-plans',
            cell: ({row}) => (
                <Link to="/programs/$programId" params={{programId: String(row.original.id)}}>
                    <Button className="mr-3" variant="outline">
                        <Book/> Study Plans
                    </Button>
                </Link>
            )
        }),
        accessor('code', {
            header: 'Code',
            cell: ({row}) => (
                <div className="font-bold w-fit rounded-lg py-1.5 px-3 bg-blue-50 text-blue-700 text-xs">
                    {row.original.code}
                </div>
            )
        }),
        accessor('name', {
            header: 'Name'
        }),
        accessor('degree', {
            header: 'Degree'
        }),
        display({
            id: 'actions',
            header: () => <div className="flex justify-end pr-7">Actions</div>,
            cell: ({row}) => (
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" onClick={() => openDialog(row.original, ProgramDialog.Edit)}>
                        <Pencil className="size-4"/>
                    </Button>
                    <Button variant="ghost" onClick={() => openDialog(row.original, ProgramDialog.Delete)}>
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        })
    ];

    const {isPending, data} = useSuspenseQuery(getPrograms());

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    });

    if (isPending) return <div className="p-10"><Loader2 className="animate-spin text-gray-500 mx-auto"/></div>

    return (
        <>
            {programDialog === ProgramDialog.Edit &&
                <EditProgramDialog program={selectedProgram} closeDialog={closeDialog}/>
            }
            {programDialog === ProgramDialog.Delete &&
                <DeleteProgramDialog program={selectedProgram} closeDialog={closeDialog}/>
            }
            <div className="rounded-lg border">
                <DataTable table={table}/>
            </div>
        </>
    );
}