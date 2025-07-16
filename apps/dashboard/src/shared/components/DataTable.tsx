import { Table as TanStackTable } from '@tanstack/table-core';
import { flexRender } from '@tanstack/react-table';
import { Table, Text } from '@mantine/core';
import classes from '@/shared/components/DataTable.module.css';

type DataTableProps<TData> = {
  table: TanStackTable<TData>;
};

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <Table.ScrollContainer className={classes.wrapper} scrollAreaProps={{offsetScrollbars: false}} minWidth={250}>
      <Table horizontalSpacing="xl" verticalSpacing="lg" className={classes.table}>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr className={classes.thead} key={headerGroup.id}>
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
              <Table.Tr
                key={row.id}
                opacity={row.getCanSelect() ? '100%' : '50%'}
                bg={row.getIsSelected() ? 'var(--mantine-primary-color-light)' : undefined}
              >
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
                <Text c="dimmed" size="sm" ta="center" pt="sm">
                  No results.
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
