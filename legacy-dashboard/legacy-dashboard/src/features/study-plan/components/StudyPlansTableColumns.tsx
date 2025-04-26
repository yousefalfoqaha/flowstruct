import {createColumnHelper} from "@tanstack/react-table";
import {StudyPlanRow} from "@/features/study-plan/types.ts";
import {StudyPlanOptionsMenu} from "@/features/study-plan/components/StudyPlanOptionsMenu.tsx";
import {visibilityBadge} from "@/shared/components/VisibilityBadge.tsx";

export function getStudyPlansTableColumns() {
    const {accessor, display} = createColumnHelper<StudyPlanRow>();

    return [
        accessor('programName', {
            header: 'Program',
            enableColumnFilter: true,
            filterFn: "equalsString"
        }),
        accessor('year', {
            header: 'Year',
            cell: ({row}) => <p>{row.original.year} - {row.original.year + 1}</p>,
            enableColumnFilter: true,
            filterFn: "equals"
        }),
        accessor('track', {
            header: 'Track',
            cell: ({row}) => row.getValue('track') ?? '---'
        }),
        accessor('duration', {
            header: () => <p className="text-nowrap">Duration</p>,
            cell: ({row}) => <p>{row.original.duration ?? 0} Years</p>
        }),
        accessor('isPrivate', {
            header: 'Status',
            cell: ({row}) => {
                return visibilityBadge(row.getValue('isPrivate'));
            }
        }),
        display({
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => (
                <StudyPlanOptionsMenu studyPlan={row.original}/>
            )
        })
    ];
}