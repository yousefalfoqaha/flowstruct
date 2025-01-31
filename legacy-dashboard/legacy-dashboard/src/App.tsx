import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ProgramOption, StudyPlanOption} from "@/types";
import {Book, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useProgramListState, useStudyPlanListState} from "@/stores";
import React from "react";

enum ProgramDialog {
    Edit = 'edit',
    StudyPlans = 'study-plans'
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="space-y-6 p-8">
                <h1 className="text-4xl font-semibold">All GJU Programs</h1>
                <ProgramsTable/>
            </div>
        </QueryClientProvider>
    );
}

type StudyPlansDialogProps = {
    program: ProgramOption | null;
    closeDialog: () => void;
}

function StudyPlansDialog({program, closeDialog}: StudyPlansDialogProps) {
    const {isPending, data} = useStudyPlanListState(program?.id);

    return (
        <Dialog open onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{program?.name} Study Plans</DialogTitle>
                    {
                        isPending
                            ? <div>Loading...</div>
                            : <div>
                                {data.map((studyPlan: StudyPlanOption) => {
                                    return <div key={studyPlan.id}>{studyPlan.year} {studyPlan.track ?? ''}</div>
                                })}
                            </div>
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

type EditProgramDialogProps = {
    program: ProgramOption | null;
    closeDialog: () => void;
}

function EditProgramDialog({program, closeDialog}: EditProgramDialogProps) {

    return (
        <Dialog open onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Program</DialogTitle>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function ProgramsTable() {
    const [selectedProgram, setSelectedProgram] = React.useState<ProgramOption | null>(null);
    const [programDialog, setProgramDialog] = React.useState<ProgramDialog | null>(null);

    const closeDialog = () => {
        setSelectedProgram(null);
        setProgramDialog(null);
    }

    const openDialog = (program: ProgramOption, dialog: ProgramDialog) => {
        setSelectedProgram(program);
        setProgramDialog(dialog);
    }

    const {isPending, data} = useProgramListState();

    const {accessor, display} = createColumnHelper<ProgramOption>();

    const columns = [
        accessor('code', {
            header: 'Code',
            cell: ({row}) => (
                <div className="font-bold w-fit rounded-lg py-1.5 px-3 bg-blue-50 text-blue-700 text-xs">
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
            cell: ({row}) => (
                <div className="flex gap-2 justify-end">
                    <Button onClick={() => openDialog(row.original, ProgramDialog.StudyPlans)}
                            className="rounded-lg flex justify-center gap-3 hover:text-white">
                        <Book/>
                        <p>Study Plans</p>
                    </Button>
                    <Button onClick={() => openDialog(row.original, ProgramDialog.Edit)}
                            variant="ghost" className="rounded-full">
                        <Pencil/>
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
        <>
            {programDialog === ProgramDialog.Edit &&
              <EditProgramDialog program={selectedProgram} closeDialog={closeDialog}/>
            }
            {programDialog === ProgramDialog.StudyPlans &&
              <StudyPlansDialog program={selectedProgram} closeDialog={closeDialog}/>
            }
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
        </>
    );
}
