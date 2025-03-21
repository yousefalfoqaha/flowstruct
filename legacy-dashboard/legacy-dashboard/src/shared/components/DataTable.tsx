import {Table as TanStackTable} from "@tanstack/table-core";
import {flexRender} from "@tanstack/react-table";
import {Table} from "@mantine/core";

type DataTableProps<TData> = {
    table: TanStackTable<TData>;
};

export function DataTable<TData>({table}: DataTableProps<TData>) {
    return (
        <div style={{ borderRadius: 4, border: "1px solid #dee2e6" }}>
            <Table horizontalSpacing="md" verticalSpacing="md">
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
                                No results.
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>

        </div>
    );
}
