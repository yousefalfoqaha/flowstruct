import {DataTable} from "@/shared/components/DataTable.tsx";
import {useStudyPlanList} from "@/features/study-plan/hooks/useStudyPlanList.ts";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {StudyPlanRowItem} from "@/features/study-plan/types.ts";
import React from "react";
import {getStudyPlansTableColumns} from "@/features/study-plan/components/StudyPlansTableColumns.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {Box, Button, Group, Stack} from "@mantine/core";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Link} from "@tanstack/react-router";
import {Plus} from "lucide-react";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {ProgramFilter} from "@/features/study-plan/components/ProgramFilter.tsx";
import {StudyPlanYearFilter} from "@/features/study-plan/components/StudyPlanYearFilter.tsx";

export function StudyPlansTable() {
    const {data: studyPlans} = useStudyPlanList();
    const {data: programs} = useProgramList();

    const columns = React.useMemo(
        () => getStudyPlansTableColumns(),
        []
    );

    const data: StudyPlanRowItem[] = React.useMemo(
        () => {
            return studyPlans.map(studyPlan => {
                const program = programs.find(p => p.id === studyPlan.program);
                return {
                    ...studyPlan,
                    programName: program ? getProgramDisplayName(program) : 'Undefined',
                };
            })
        },
        [programs, studyPlans]
    );

    const table = useDataTable<StudyPlanRowItem>({data, columns});

    return (
        <Stack gap="md">
            <Group grow preventGrowOverflow={false}>
                <DataTableSearch width={800} table={table} placeholder="Search any study plan..."/>
                <ProgramFilter table={table} programs={programs}/>
                <StudyPlanYearFilter table={table}/>
            </Group>

            <AppCard
                title="All Study Plans"
                subtitle={`Manage university study plans - ${studyPlans.length} study plan${studyPlans.length > 1 && 's'} total`}
                headerAction={
                    <Link to="/study-plans/new">
                        <Button leftSection={<Plus size={18}/>}>Create New Study Plan</Button>
                    </Link>
                }
            >
                <DataTable table={table}/>
            </AppCard>

            <Box ml="auto">
                <DataTablePagination table={table}/>
            </Box>
        </Stack>
    );
}
