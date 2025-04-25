import {Table} from "@tanstack/react-table";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";
import {Select} from "@mantine/core";
import {ProgramSummary} from "@/features/program/types.ts";
import {StudyPlanRow} from "@/features/study-plan/types.ts";
import React from "react";

type Props = {
    table: Table<StudyPlanRow>;
    programs: ProgramSummary[];
};

export function ProgramFilter({table, programs}: Props) {
    const programColumn = React.useMemo(
        () => table.getColumn('programName'),
        [table]
    );
    if (!programColumn) return;

    const filteredProgram = programColumn.getFilterValue();

    return (
        <Select
            w={200}
            placeholder="Filter by program"
            value={typeof filteredProgram === 'string' ? filteredProgram : null}
            data={programs.map(p => getProgramDisplayName(p))}
            onChange={val => programColumn.setFilterValue(val)}
            searchable
            clearable
            onClear={() => programColumn.setFilterValue(null)}
        />
    );
}
