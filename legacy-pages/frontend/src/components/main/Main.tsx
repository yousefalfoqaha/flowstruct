import * as React from "react";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {useQuery} from "@tanstack/react-query";

type Program = {
    id: number;
    name: string;
    degree: string;
};

export function Main() {
    const {data: programs, isPending, error} = useQuery<Program[]>({
        queryKey: ['programs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8080/api/v1/programs');
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        },
    });
    const [open, setOpen] = React.useState(false);
    const [selectedProgram, setSelectedProgram] = React.useState<Program | null>(null);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {selectedProgram ? selectedProgram.name + " " + selectedProgram.degree : 'Select a program...'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <ProgramList
                    programs={programs}
                    isPending={isPending}
                    error={error}
                    setOpen={setOpen}
                    setSelectedProgram={setSelectedProgram}
                />
            </PopoverContent>
        </Popover>
    );
}

type ProgramListProps = {
    programs: Program[] | undefined;
    error: unknown;
    isPending: boolean;
    setOpen: (open: boolean) => void;
    setSelectedProgram: (program: Program | null) => void;
};

function ProgramList({
                         programs,
                         error,
                         isPending,
                         setOpen,
                         setSelectedProgram,
                     }: ProgramListProps) {
    return (
        <Command>
            <CommandInput placeholder="Filter programs..."/>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
                {
                    isPending
                        ? "Loading..."
                        : <CommandGroup>
                            {programs?.map((program) => (
                                <CommandItem
                                    key={program.id}
                                    value={program.id.toString()}
                                    onSelect={(value) => {
                                        setSelectedProgram(
                                            programs.find((p) => p.id.toString() === value) || null
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {program.name + " " + program.degree
                                        .toLowerCase()
                                        .charAt(0)
                                        .toUpperCase() + program.degree.slice(1)}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                }
                {error ? "An error occurred." : null}
            </CommandList>
        </Command>
    );
}
