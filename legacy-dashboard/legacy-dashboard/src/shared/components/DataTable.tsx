import {Table as TanStackTable} from "@tanstack/table-core";
import {flexRender} from "@tanstack/react-table";
import {Table} from "@mantine/core";

type DataTableProps<TData> = {
    table: TanStackTable<TData>;
}

export function DataTable<TData>({table}: DataTableProps<TData>) {
    return (
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <Table.Th className="p-4" key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </Table.Th>
                            );
                        })}
                    </Table.Tr>
                ))}
            </Table.Thead>
            <Table.Tbody>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <Table.Tr
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <Table.Td className="p-4" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Table.Td>
                            ))}
                        </Table.Tr>

                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={table.getLeafHeaders().length} className="h-24 text-center">
                            No results.
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    );
}