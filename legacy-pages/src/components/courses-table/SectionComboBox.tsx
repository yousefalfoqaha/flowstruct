import * as React from 'react'
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  Library,
  LibraryBig,
  LucideIcon,
  PlusCircle,
  X,
  XCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: 'ff',
    label: 'Remedial Courses',
  },
  {
    value: 'backlog',
    label: 'University Requirements',
  },
  {
    value: 'todo',
    label: 'School Requirements',
  },
  {
    value: 'in progress',
    label: 'Program Requirements',
  },
  {
    value: 'done',
    label: 'Special Courses (General Track)',
  },
]

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-dashed shadow-sm"
          >
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <p className="inline-flex items-center justify-center">
                <PlusCircle className="scale-75" />{' '}
                <p className="px-1">Sections</p>
              </p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Filter by sections..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedStatus ? (
        <Button
          variant="ghost"
          className="h-9 inline-flex items-center justify-center p-1"
        >
          <p className="pl-2">Reset</p>
          <X className="scale-75" />
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}
