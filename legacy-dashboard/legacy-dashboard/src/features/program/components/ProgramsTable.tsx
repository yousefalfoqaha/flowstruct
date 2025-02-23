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

export function ProgramsTable() {
    const {accessor, display} = createColumnHelper<ProgramListItem>();

    const deleteProgram = useDeleteProgram();

    const columns = [
        display({
            id: 'study-plans',
            cell: ({row}) => (
                <Link to="/programs/$programId/study-plans" params={{programId: String(row.original.id)}}>
                    <Button variant="outline" leftSection={<Book size={14}/>}>
                        Study Plans
                    </Button>
                </Link>
            )
        }),
        accessor('name', {
            header: 'Name'
        }),
        accessor('degree', {
            header: 'Degree'
        }),
        accessor('code', {
            header: 'Code',
            cell: ({row}) => (
                <Badge>{row.original.code}</Badge>
            )
        }),
        display({
            id: 'actions',
            header: () => <div className="flex justify-end pr-7">Actions</div>,
            cell: ({row}) => (
                <div className="flex gap-2 justify-end">
                    <ActionIcon
                        variant="light"
                        size="md"
                        onClick={() =>
                            modals.open({
                                title: `Edit ${row.original.degree} ${row.original.name} Details`,
                                centered: true,
                                children: <EditProgramDetailsModal program={row.original}/>
                            })
                        }>
                        <Pencil size={18}/>
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        size="md"
                        onClick={() =>
                            modals.openConfirmModal({
                                title: 'Please confirm your action',
                                children: (
                                    <Text size="sm">
                                        Deleting this program will delete all of its study plans, are you absolutely
                                        sure?
                                    </Text>
                                ),
                                labels: {confirm: 'Confirm', cancel: 'Cancel'},
                                onConfirm: () => deleteProgram.mutate(row.original.id)
                            })
                        }
                    >
                        <Trash size={18}/>
                    </ActionIcon>
                </div>
            )
        })
    ];

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