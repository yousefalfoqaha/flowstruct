import {Table} from "@tanstack/react-table";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {Select} from "@mantine/core";
import {ProgramListItem} from "@/features/program/types.ts";
import {StudyPlanRowItem} from "@/features/study-plan/types.ts";

type Props = {
    table: Table<StudyPlanRowItem>;
    programs: ProgramListItem[];
};

export function ProgramFilter({table, programs}: Props) {
    const selectedProgram = table.getState().columnFilters.find(f => f.id === 'programName')?.value as string | undefined;

    return (
        <Select
            w={300}
            placeholder="Filter by program"
            value={selectedProgram || null}
            data={programs.map(p => getProgramDisplayName(p))}
            onChange={(val) => table.setColumnFilters([{id: 'programName', value: val ?? ''}])}
            searchable
            clearable
            onClear={() => table.setColumnFilters([])}
        />
    );
}
