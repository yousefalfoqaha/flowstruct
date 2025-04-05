import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ArrowRightFromLine, Eye, EyeOff, Pencil, Trash} from "lucide-react";
import {ActionIcon, Badge, Text} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Link} from "@tanstack/react-router";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {useToggleStudyPlanVisibility} from "@/features/study-plan/hooks/useToggleStudyPlanVisibility.ts";
import {modals, openModal} from "@mantine/modals";
import {EditStudyPlanDetailsModal} from "@/features/study-plan/components/EditStudyPlanDetailsModal.tsx";
import {Button} from "@mantine/core";
import {useDeleteStudyPlan} from "@/features/study-plan/hooks/useDeleteStudyPlan.ts";

type StudyPlansTableProps = {
    studyPlanList: StudyPlanListItem[];
}

export function StudyPlansTable({studyPlanList}: StudyPlansTableProps) {
    const toggleVisibility = useToggleStudyPlanVisibility();
    const deleteStudyPlan = useDeleteStudyPlan();

    const {accessor, display} = createColumnHelper<StudyPlanListItem>();
    const columns = [
        display({
            id: 'open',
            cell: ({row}) => (
                <Link to="/study-plans/$studyPlanId/overview"
                      params={{
                          studyPlanId: String(row.original.id)
                      }}>
                    <Button variant="outline" rightSection={<ArrowRightFromLine size={14}/>}>
                        View
                    </Button>
                </Link>
            )
        }),
        accessor('year', {
            header: 'Year',
            cell: ({row}) => <p>{row.original.year} - {row.original.year + 1}</p>
        }),
        accessor('track', {
            header: 'Track',
            cell: ({row}) => row.getValue('track') ?? '---'
        }),
        accessor('isPrivate', {
            header: 'Visibility',
            cell: ({row}) => {
                return row.getValue('isPrivate')
                    ?
                    <Badge variant="outline" leftSection={<EyeOff size={12}/>}>Private</Badge>
                    : <Badge leftSection={<Eye size={12}/>}> Public</Badge>
            }
        }),
        accessor('duration', {
            header: () => <p className="text-nowrap">Duration (Years)</p>,
            cell: ({row}) => <p>{row.original.duration ?? 0} Yrs</p>
        }),
        display({
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => (
                <div>
                    <ActionIcon
                        variant="light"
                        size="md"
                        onClick={() =>
                            openModal({
                                title: `Edit ${row.original.year}-${row.original.year + 1} ${row.original.track ?? ''} Details`,
                                centered: true,
                                children: <EditStudyPlanDetailsModal studyPlan={row.original}/>
                            })
                        }
                    >
                        <Pencil size={18}/>
                    </ActionIcon>

                    <ActionIcon
                        variant="light"
                        size="md"
                        onClick={() => toggleVisibility.mutate(row.original.id)}
                    >
                        {row.getValue('isPrivate')
                            ? <Eye size={18}/>
                            : <EyeOff size={18}/>
                        }
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        size="md"
                        onClick={() =>
                            modals.openConfirmModal({
                                title: 'Please confirm your action',
                                children: (
                                    <Text size="sm">
                                        Deleting this study plan will delete all of its sections, program map, and
                                        overview, are you absolutely
                                        sure?
                                    </Text>
                                ),
                                labels: {confirm: 'Confirm', cancel: 'Cancel'},
                                onConfirm: () => deleteStudyPlan.mutate(row.original)
                            })
                        }
                    >
                        <Trash size={18}/>
                    </ActionIcon>
                </div>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data: studyPlanList ?? [],
        getCoreRowModel: getCoreRowModel()
    });

    return <DataTable table={table}/>;
}
