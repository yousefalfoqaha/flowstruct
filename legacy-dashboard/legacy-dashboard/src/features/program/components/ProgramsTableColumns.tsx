import {createColumnHelper} from "@tanstack/react-table";
import {ProgramListItem} from "@/features/program/types.ts";
import {Link} from "@tanstack/react-router";
import {ActionIcon, Badge, Button, Text} from "@mantine/core";
import {Book, Pencil, Trash} from "lucide-react";
import {modals} from "@mantine/modals";
import {EditProgramDetailsModal} from "@/features/program/components/EditProgramDetailsModal.tsx";
import {useDeleteProgram} from "@/features/program/hooks/useDeleteProgram.ts";

export function getProgramsTableColumns() {
    const {display, accessor} = createColumnHelper<ProgramListItem>();
    const deleteProgram = useDeleteProgram();

    return [
        display({
            id: 'study-plans',
            cell: ({row}) => (
                <Link to="/programs/$programId" params={{programId: String(row.original.id)}}>
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
                                children: <EditProgramDetailsModal program={row.original}/>,
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
}