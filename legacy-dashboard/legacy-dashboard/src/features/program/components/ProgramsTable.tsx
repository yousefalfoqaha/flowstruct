import {DataTable} from "@/shared/components/DataTable.tsx";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {getProgramsTableColumns} from "@/features/program/components/ProgramsTableColumns.tsx";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Box, Button, Group, Stack} from "@mantine/core";
import React from "react";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {Plus} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {ProgramDegreeFilter} from "@/features/program/components/ProgramDegreeFilter.tsx";

export function ProgramsTable() {
    const {data} = useProgramList();
    const columns = React.useMemo(() => getProgramsTableColumns(), []);
    const table = useDataTable<ProgramListItem>({data, columns});

    return (
        <Stack gap="md">
            <Group grow preventGrowOverflow={false}>
                <DataTableSearch width={800} table={table} placeholder="Search any program..."/>
                <ProgramDegreeFilter table={table} />
            </Group>

            <AppCard
                title="All Programs"
                subtitle={`Manage university programs - ${data.length} program${data.length > 1 && 's'} total`}
                headerAction={
                    <Link to={'/programs/new'}>
                        <Button leftSection={<Plus size={18}/>}>Create New Program</Button>
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
