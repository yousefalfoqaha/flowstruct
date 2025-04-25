import {DateValue, YearPickerInput} from "@mantine/dates";
import {Calendar} from "lucide-react";
import {Table} from "@tanstack/react-table";
import {StudyPlanRow} from "@/features/study-plan/types.ts";
import React from "react";

type Props = {
    table: Table<StudyPlanRow>;
}

export function StudyPlanYearFilter({table}: Props) {
    const yearColumn = React.useMemo(() => table.getColumn('year'), [table]);
    if (!yearColumn) return null;

    const filteredYear = yearColumn.getFilterValue() as number | undefined;

    const handleFilter = (val: DateValue | null) => {
        if (!val) {
            yearColumn.setFilterValue(null);
            return;
        }
        yearColumn.setFilterValue(val.getFullYear());
    }

    return (
        <YearPickerInput
            w={200}
            value={typeof filteredYear === 'number' ? new Date(filteredYear, 0, 1) : null}
            placeholder="Filter by year"
            onChange={handleFilter}
            leftSection={<Calendar size={18}/>}
            allowDeselect
            clearable
        />
    );
}
