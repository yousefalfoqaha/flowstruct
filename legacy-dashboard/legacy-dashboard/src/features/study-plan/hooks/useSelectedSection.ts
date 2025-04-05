import {Table} from "@tanstack/react-table";
import {FrameworkCourse} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import React from "react";

type UseSelectedSectionProps = {
    table: Table<FrameworkCourse>;
}

export const useSelectedSection = ({table}: UseSelectedSectionProps) => {
    const {data: {sections}} = useStudyPlan();
    const columnFilters = table.getState().columnFilters;

    const selectedSectionId = React.useMemo(() => {
        return columnFilters.find(f => f.id === 'section')?.value as number;
    }, [columnFilters]);

    return React.useMemo(() => {
        return sections.find(s => s.id === selectedSectionId);
    }, [selectedSectionId, sections]) ?? null;
};
