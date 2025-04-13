import {DataTable} from "@/shared/components/DataTable.tsx";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {getProgramsTableColumns} from "@/features/program/components/ProgramsTableColumns.tsx";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Box, Card, Stack, Text} from "@mantine/core";
import React from "react";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";

export function ProgramsTable() {
    const {data} = useProgramList();
    const columns = React.useMemo(
        () => getProgramsTableColumns(),
        []
    );

    const {table} = useDataTable<ProgramListItem>({data, columns});

    return (
        <Stack gap="md">
            <DataTableSearch table={table} placeholder="Search any program..."/>
            <Card shadow="sm" withBorder>
                <Text size="xl" fw={600}>All Programs</Text>
                <Text size="xs" c="dimmed">Manage university programs - {data.length} program{data.length > 1 && 's'} total</Text>

                <Card.Section inheritPadding py="lg">
                    <DataTable table={table}/>
                </Card.Section>
            </Card>
            <Box ml="auto">
                <DataTablePagination table={table} />
            </Box>
        </Stack>
    );
}
