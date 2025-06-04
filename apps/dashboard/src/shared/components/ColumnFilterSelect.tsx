import { Select } from '@mantine/core';
import { Table } from '@tanstack/react-table';

type ColumnFilterSelectProps<TData> = {
  table: Table<TData>;
  columnId: keyof TData;
  placeholder?: string;
  options: { label: string; value: string }[];
};

export function ColumnFilterSelect<TData>({
  table,
  columnId,
  placeholder = 'Filter...',
  options,
}: ColumnFilterSelectProps<TData>) {
  const column = table.getColumn(columnId as string);
  const value = column?.getFilterValue() as string;

  return (
    <Select
      placeholder={placeholder}
      data={options}
      value={value}
      onChange={(val) => table.setGlobalFilter(val || '')}
      clearable
    />
  );
}
