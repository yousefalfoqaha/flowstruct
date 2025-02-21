import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/shared/components/ui/button.tsx";
import {ArrowRightFromLine, Eye, EyeOff, Pencil, Trash} from "lucide-react";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Link} from "@tanstack/react-router";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {useToggleStudyPlanVisibility} from "@/features/study-plan/hooks/useToggleStudyPlanVisibility.ts";

type StudyPlansTableProps = {
    studyPlanList: StudyPlanListItem[];
}

export function StudyPlansTable({studyPlanList}: StudyPlansTableProps) {
    const {openDialog} = useDialog<StudyPlanListItem>();
    const toggleVisibility = useToggleStudyPlanVisibility();

    const {accessor, display} = createColumnHelper<StudyPlanListItem>();
    const columns = [
        display({
            id: 'open',
            cell: ({row}) => (
                <Link to="/study-plans/$studyPlanId"
                      params={{studyPlanId: String(row.original.id)}} search={{}}>
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
                    ?
                    <Badge variant="outline" className="text-nowrap gap-1"><EyeOff className="size-4"/> Private</Badge>
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
                            onClick={() => openDialog(row.original, 'EDIT')}>
                        <Pencil/>
                    </Button>
                    <Button variant="ghost" onClick={() => toggleVisibility.mutate(row.original)}>
                        {row.getValue('isPrivate')
                            ? <Eye/>
                            : <EyeOff/>
                        }
                    </Button>
                    <Button variant="ghost" onClick={() => openDialog(row.original, 'DELETE')}>
                        <Trash className="size-4"/>
                    </Button>
                </div>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data: studyPlanList ?? [],
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="rounded-lg border overflow-auto">
            <DataTable table={table}/>
        </div>
    );
}
