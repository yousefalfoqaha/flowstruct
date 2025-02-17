import {ProgramOption, StudyPlanOption} from "@/types";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRightFromLine, Eye, EyeOff, Loader2, Pencil, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {DataTable} from "@/components/DataTable.tsx";
import React from "react";
import {EditStudyPlanDialog} from "@/components/EditStudyPlanDialog.tsx";
import {getProgramStudyPlans} from "@/queries/getProgramStudyPlans.ts";
import {DeleteStudyPlanDialog} from "@/components/DeleteStudyPlanDialog.tsx";
import {Link} from "@tanstack/react-router";

type StudyPlansTableProps = {
    program: ProgramOption;
}

enum StudyPlanDialog {
    Edit = 'edit',
    Delete = 'delete'
}

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
                title: updatedStudyPlan.isPrivate ? 'Study plan has been made public.' : 'Study plan has been made private.',
                description: updatedStudyPlan.isPrivate ? 'Latest changes will be public.' : 'Latest changes will be private.'
            });
        }
    });

    const {accessor, display} = createColumnHelper<StudyPlanOption>();

    const columns = [
        display({
            id: 'open',
            cell: ({row}) => (
                <Link to="/study-plans/$studyPlanId" params={{studyPlanId: String(row.original.id)}}>
                    <Button variant="outline">
                        View <ArrowRightFromLine/>
                    </Button>
                </Link>
            )
        }),
        accessor('year', {
            header: 'Year',
            cell: ({row}) => <p>{row.original.year}/{row.original.year + 1}</p>
        }),
        accessor('track', {
            header: 'Track',
            cell: ({row}) => row.getValue('track') ?? '---'
        }),
        accessor('isPrivate', {
            header: 'Visibility',
            cell: ({row}) => {
                return row.getValue('isPrivate')
                    ? <Badge variant="outline" className="text-nowrap gap-1"><EyeOff className="size-4"/> Private</Badge>
                    : <Badge className="text-nowrap gap-1"><Eye className="size-4"/> Public</Badge>
            }
        }),
        accessor('duration', {
            header: () => <p className="text-nowrap">Duration (Years)</p>,
            cell: ({row}) => <p>{row.original.duration ?? 0} Yrs</p>
        }),
        display({
            id: 'actions',
            header: () => <div className="flex justify-end pr-14">Actions</div>,
            cell: ({row}) => (
                <div className="flex gap-2 justify-end items-center">
                    <Button variant="ghost"
                            onClick={() => openDialog(row.original, StudyPlanDialog.Edit)}>
                        <Pencil/>
                    </Button>
                    <Button variant="ghost" onClick={() => toggleVisibilityMutation.mutate(row.original)}>
                        {row.getValue('isPrivate')
                            ? <Eye/>
                            : <EyeOff/>
                        }
                    </Button>
                    <Button variant="ghost" onClick={() => openDialog(row.original, StudyPlanDialog.Delete)}>
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        })
    ];

    const {isPending, data} = useSuspenseQuery(getProgramStudyPlans(program.id));

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
            {studyPlanDialog === StudyPlanDialog.Delete &&
                <DeleteStudyPlanDialog studyPlan={selectedStudyPlan} closeDialog={closeDialog}/>
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
