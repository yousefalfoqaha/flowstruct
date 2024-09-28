import * as React from 'react'
import { PlusCircle, X } from 'lucide-react'
import { Section, sections } from '@/data/sections'
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

type ComboboxPopoverProps = {
  selectedSection: Section | null
  setSelectedSection: (section: Section | null) => void
}

export function ComboboxPopover({ selectedSection, setSelectedSection }: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-dashed shadow-sm"
          >
            {selectedSection ? (
              <>{selectedSection.name}</>
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
                {Object.values(sections).map((section) => (
                  <CommandItem
                    key={section.id}
                    value={section.id.toString()}
                    onSelect={(id) => {
                      setSelectedSection(sections[parseInt(id)] || null)
                      setOpen(false)
                    }}
                  >
                    {section.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedSection ? (
        <Button
          variant="ghost"
          className="h-9 inline-flex items-center justify-center p-1"
          onClick={() => setSelectedSection(null)}
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
