import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandList} from "@/components/ui/command.tsx";
import * as React from "react";

export function SchoolFilter() {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-3">
                    <div className="flex flex-row w-full">
                        <p className="my-auto text-left pr-2">School</p>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 my-auto"/>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput placeholder="Filter by school..."/>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup className="p-2">
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}