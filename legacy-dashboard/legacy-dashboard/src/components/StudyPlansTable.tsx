import {ProgramOption, StudyPlanOption} from "@/types";
import {useStudyPlanListState} from "@/stores";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRightFromLine, Eye, EyeOff, Loader2, Pencil, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {DataTable} from "@/components/DataTable.tsx";
import React from "react";
import {EditStudyPlanDialog} from "@/components/EditStudyPlanDialog.tsx";

type StudyPlansTableProps = {
    program: ProgramOption;
}

enum StudyPlanDialog {
    Edit = 'edit',
    Delete = 'delete'
}

// implement global delete dialog

export function StudyPlansTable({program}: StudyPlansTableProps) {
    const [selectedStudyPlan, setSelectedStudyPlan] = React.useState<StudyPlanOption | null>(null);
    const [studyPlanDialog, setStudyPlanDialog] = React.useState<StudyPlanDialog | null>(null);

    const closeDialog = () => {
        setSelectedStudyPlan(null);
        setStudyPlanDialog(null);
    }

    const openDialog = (studyPlan: StudyPlanOption, dialog: StudyPlanDialog) => {
        setSelectedStudyPlan(studyPlan);
        setStudyPlanDialog(dialog);
    }

    const queryClient = useQueryClient();

    const {toast} = useToast();

    const {isPending, data} = useStudyPlanListState(program.id);

    const toggleVisibilityMutation = useMutation({
        mutationFn: async (updatedStudyPlan: StudyPlanOption) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${updatedStudyPlan?.id}/toggle-visibility`, {
                method: 'PUT'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred.');
            }
        },
        onSuccess: (_, updatedStudyPlan) => {
            queryClient.setQueryData(
                ['study-plans', program?.id],
                (oldStudyPlans: StudyPlanOption[] | undefined) => {
                    if (!oldStudyPlans) return [];

                    return oldStudyPlans.map(sp => (
                            sp.id === updatedStudyPlan.id
                                ? {...sp, isPrivate: !sp.isPrivate}
                                : sp
                        )
                    );
                });

            toast({
                title: updatedStudyPlan.isPrivate ? 'Study plan has been made private.' : 'Study plan has been made public.',
                description: updatedStudyPlan.isPrivate ? 'Latest changes will be private.' : 'Latest changes will be public.'
            });
        }
    });

    const {accessor, display} = createColumnHelper<StudyPlanOption>();

    const columns = [
        display({
            id: 'open',
            cell: () => (
                <Button variant="outline">
                    <ArrowRightFromLine/>
                </Button>
            )
        }),
        accessor('year', {
            header: 'Year',
            cell: ({row}) => <p>{row.original.year}/{row.original.year + 1}</p>
        }),
        accessor('track', {
            header: 'Track',
            cell: ({row}) => row.getValue('track') ?? ''
        }),
        accessor('isPrivate', {
            header: 'Visibility',
            cell: ({row}) => {
                return row.getValue('isPrivate')
                    ? <Badge className="text-nowrap gap-1"><Eye className="size-4"/> Public</Badge>
                    :
                    <Badge variant="outline" className="text-nowrap gap-1"><EyeOff className="size-4"/> Private</Badge>
            }
        }),
        display({
            id: 'actions',
            header: () => <div className="ml-auto w-full">Actions</div>,
            cell: ({row}) => (
                <div className="flex gap-2 justify-end items-center">
                    <Button variant="ghost" className="w-80"
                            onClick={() => openDialog(row.original, StudyPlanDialog.Edit)}>
                        <Pencil/>
                    </Button>
                    <Button variant="ghost" onClick={() => toggleVisibilityMutation.mutate(row.original)}>
                        {row.getValue('isPrivate')
                            ? <EyeOff/>
                            : <Eye/>
                        }
                    </Button>
                    <Button variant="ghost">
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <>
            {studyPlanDialog === StudyPlanDialog.Edit &&
                <EditStudyPlanDialog studyPlan={selectedStudyPlan} closeDialog={closeDialog}/>
            }
            {isPending
                ? <div className="p-10"><Loader2 className="animate-spin text-gray-500 mx-auto"/></div>
                : <div className="rounded-lg border overflow-auto">
                    <DataTable table={table}/>
                </div>
            }
        </>
    );
}
