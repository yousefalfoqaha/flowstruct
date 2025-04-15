import {DataTable} from "@/shared/components/DataTable.tsx";
import {useProgramList} from "@/features/program/hooks/useProgramList.ts";
import {getProgramsTableColumns} from "@/features/program/components/ProgramsTableColumns.tsx";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {Degree, ProgramListItem} from "@/features/program/types.ts";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {Box, Button, Group, Select, Stack} from "@mantine/core";
import React from "react";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {Plus} from "lucide-react";
import {Link} from "@tanstack/react-router";

export function ProgramsTable() {
    const {data} = useProgramList();
    const columns = React.useMemo(() => getProgramsTableColumns(), []);
    const table = useDataTable<ProgramListItem>({data, columns});

    return (
        <Stack gap="md">
            <Group justify="space-between" preventGrowOverflow>
                <Group>
                    <Select
                        placeholder="Filter degree"
                        data={Object.entries(Degree).map(([key, value]) => (
                            {value: key, label: value}
                        ))}
                        onChange={(val) => table.setGlobalFilter(val || '')}
                        clearable
                    />
                    <DataTableSearch table={table} placeholder="Search any program..."/>
                </Group>
                <Link to={'/programs/new'}>
                    <Button leftSection={<Plus size={18} />}>Create New Program</Button>
                </Link>
            </Group>

            <AppCard
                title="All Programs"
                subtitle={`Manage university programs - ${data.length} program${data.length > 1 && 's'} total`}
            >
                <DataTable table={table}/>
            </AppCard>

            <Box ml="auto">
                <DataTablePagination table={table}/>
            </Box>
        </Stack>
    );
}
