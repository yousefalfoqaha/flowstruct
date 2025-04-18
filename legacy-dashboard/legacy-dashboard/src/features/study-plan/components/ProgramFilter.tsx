import {Table} from "@tanstack/react-table";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {Select} from "@mantine/core";
import {ProgramListItem} from "@/features/program/types.ts";
import {useNavigate} from "@tanstack/react-router";
import {StudyPlanRowItem} from "@/features/study-plan/types.ts";

type Props = {
    table: Table<StudyPlanRowItem>;
    programs: ProgramListItem[];
};

export function ProgramFilter({table, programs}: Props) {
    const navigate = useNavigate();

    const selectedProgram = table.getState().columnFilters.find(f => f.id === 'programName')?.value as string | undefined;

    const resetFilter = () => navigate({
        to: ".",
        search: (prev) => ({...prev, columnFilters: []})
    });

    return (
        <Select
            w={300}
            placeholder="Filter by program"
            value={selectedProgram || null}
            data={programs.map(p => getProgramDisplayName(p))}
            onChange={(val) => table.setColumnFilters([{id: 'programName', value: val ?? ''}])}
            searchable
            clearable
            onClear={resetFilter}
        />
    );
}