import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '../ui/scroll-area'
import { Pagination } from './Pagination'
import { Input } from '../ui/input'
import { useSemesters } from '@/hooks/useSemesters'
import { courseInSemester } from '@/lib/utils'
import { Button } from '../ui/button'
import { ComboboxPopover } from './SectionComboBox'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  semesterId: number
  onCloseStudyPlan: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  semesterId,
  onCloseStudyPlan,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const { semesters, addCourseToSemester } = useSemesters()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: (row) => !courseInSemester(row.original.id, semesters),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleAddCourses = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    Object.values(selectedRows).map((row) => {
      addCourseToSemester(semesterId, parseInt(row.original.id))
    })
    onCloseStudyPlan()
    table.setRowSelection({})
  }

  return (
    <div className="flex flex-col h-full">
      <div className='flex gap-2'>
        <Input
          placeholder="Filter courses..."
          value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
          onChange={(event: any) =>
            table.getColumn('code')?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-96 h-9 shadow-sm my-2"
        />
        <ComboboxPopover />
      </div>
      <ScrollArea className="border rounded-md flex-grow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`h-16 ${
                    row.getCanSelect() ? '' : 'text-gray-400'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="p-2">
        <Pagination table={table} />
      </div>
      <Button
        onClick={handleAddCourses}
        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
      >
        Add Selected Courses
      </Button>
    </div>
  )
}
