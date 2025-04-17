import {DataTable} from "@/shared/components/DataTable.tsx";
import {useStudyPlanList} from "@/features/study-plan/hooks/useStudyPlanList.ts";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {StudyPlanRowItem} from "@/features/study-plan/types.ts";
import React from "react";
import {getStudyPlansTableColumns} from "@/features/study-plan/components/StudyPlansTableColumns.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {Box, Button, Group, Select, Stack} from "@mantine/core";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Link} from "@tanstack/react-router";
import {Plus} from "lucide-react";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";

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
            <Group justify="space-between" preventGrowOverflow>
                <Group>
                    <Select
                        w={300}
                        placeholder="Filter by program"
                        data={programs.map(p => getProgramDisplayName(p))}
                        onChange={(val) => table.setGlobalFilter(val || '')}
                        searchable
                        clearable
                    />
                    <DataTableSearch table={table} placeholder="Search any study plan..."/>
                </Group>
                <Link to="/study-plans">
                    <Button leftSection={<Plus size={18}/>}>Create New Study Plan</Button>
                </Link>
            </Group>

            <AppCard
                title="All Study Plans"
                subtitle={`Manage university study plans - ${studyPlans.totalStudyPlans} study plan${studyPlans.totalStudyPlans > 1 && 's'} total`}
            >
                <DataTable table={table}/>
            </AppCard>

            <Box ml="auto">
                <DataTablePagination table={table}/>
            </Box>
        </Stack>
    );
}
