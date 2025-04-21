import {createColumnHelper} from "@tanstack/react-table";
import {StudyPlanRowItem} from "@/features/study-plan/types.ts";
import {StudyPlanOptionsMenu} from "@/features/study-plan/components/StudyPlanOptionsMenu.tsx";
import {getVisibilityBadge} from "@/utils/getVisibilityBadge.tsx";

export function getStudyPlansTableColumns() {
    const {accessor, display} = createColumnHelper<StudyPlanRowItem>();

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
        accessor('isPrivate', {
            header: 'Status',
            cell: ({row}) => {
                return getVisibilityBadge(row.getValue('isPrivate'));
            }
        }),
        accessor('duration', {
            header: () => <p className="text-nowrap">Duration</p>,
            cell: ({row}) => <p>{row.original.duration ?? 0} Years</p>
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