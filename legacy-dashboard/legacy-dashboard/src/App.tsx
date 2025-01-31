import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ProgramOption} from "@/types";
import {Book, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="space-y-6 p-8">
                <h1 className="text-4xl font-semibold">All GJU Programs</h1>
                <ProgramsTable/>
            </div>
        </QueryClientProvider>
    );
}

export default App;

function studyPlansDialog({programId}: {programId: number}) {
    const fetchProgramStudyPlans = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/programs/${programId}/study-plans`);
        return await res.json();
    }

    const {isPending, data} = useQuery({queryKey: ['studyPlans', programId], queryFn: fetchProgramStudyPlans});

    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function ProgramsTable() {
    const fetchPrograms = async () => {
        const res = await fetch('http://localhost:8080/api/v1/programs');
        return await res.json();
    }

    const {isPending, data} = useQuery({queryKey: ['programs'], queryFn: fetchPrograms});

    const {accessor, display} = createColumnHelper<ProgramOption>();

    const columns = [
        accessor('code', {
            header: 'Code',
            cell: ({row}) => (
                <div className="font-bold w-fit  rounded-lg py-1.5 px-3 bg-blue-50 text-blue-700 text-xs">
                    {row.original.code}
                </div>
            )
        }),
        accessor('name', {
            header: 'Name'
        }),
        accessor('degree', {
            header: 'Degree'
        }),
        display({
            id: 'actions',
            cell: () => (
                <div className="flex gap-2 justify-end">
                    <Button className="rounded-lg flex justify-center gap-3 hover:text-white">
                        <Book />
                        <p>Study Plans</p>
                    </Button>
                    <Button variant="ghost" className="rounded-full">
                        <Pencil />
                    </Button>
                </div>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    });

    if (isPending) return <span>Loading...</span>

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className="p-4" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className="p-4" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
