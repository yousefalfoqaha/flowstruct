import {ProgramOption} from "@/types";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Book, Loader2, Pencil, Trash} from "lucide-react";
import {DataTable} from "@/components/DataTable.tsx";
import {Link} from "@tanstack/react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getPrograms} from "@/queries/getPrograms.ts";
import {useDialog} from "@/hooks/useDialog.ts";

export function ProgramsTable() {
    const {accessor, display} = createColumnHelper<ProgramOption>();
    const {openDialog} = useDialog<ProgramOption>();

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
                    <Button variant="ghost" onClick={() => openDialog(row.original, 'EDIT')}>
                        <Pencil className="size-4"/>
                    </Button>
                    <Button variant="ghost" onClick={() => openDialog(row.original, 'DELETE')}>
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
        <div className="rounded-lg border">
            <DataTable table={table}/>
        </div>
    );
}