import { Course } from '@/data/courses'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { sections } from '@/data/sections'
import { Badge } from '../ui/badge'

export const columns: ColumnDef<Course>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) =>
      row.getCanSelect() ? (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ) : (
        ''
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'creditHours',
    header: 'Cr Hr',
  },
  {
    accessorKey: 'section',
    header: 'Section',
    cell: ({ row }) => {
      const section = Object.values(sections).find((section) =>
        section.courseIds.includes(row.original.id)
      )
      return (
        section 
      ? <Badge variant='outline'>{section.name}</Badge>
      : 'N/A'
      ) 
    },
  },
]
