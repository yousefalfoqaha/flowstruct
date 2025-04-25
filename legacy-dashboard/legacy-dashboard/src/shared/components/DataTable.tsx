import {Table as TanStackTable} from "@tanstack/table-core";
import {flexRender} from "@tanstack/react-table";
import {Table, Text} from "@mantine/core";
import classes from "./DataTable.module.css";

type DataTableProps<TData> = {
    table: TanStackTable<TData>;
};

export function DataTable<TData>({table}: DataTableProps<TData>) {
    return (
        <div>
            <Table
                horizontalSpacing="sm"
                classNames={{
                    table: classes.table
                }}
                verticalSpacing="sm"
            >
                <Table.Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Table.Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Table.Th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Thead>
                <Table.Tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <Table.Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Table.Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={table.getLeafHeaders().length}>
                                <Text c="dimmed" size="sm" ta="center" pt="sm">No results.</Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>

        </div>
    );
}
