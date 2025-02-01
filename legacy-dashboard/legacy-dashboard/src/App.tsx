import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ProgramOption, StudyPlanOption} from "@/types";
import {Book, Pencil, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useProgramListState, useStudyPlanListState} from "@/stores";
import React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

enum ProgramDialog {
    Edit = 'edit',
    StudyPlans = 'study-plans'
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="space-y-6 p-8">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-4xl font-semibold">All GJU Programs</h1>
                    <CreateProgram />
                </div>
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
    );
}

type EditProgramDialogProps = {
    program: ProgramOption | null;
    closeDialog: () => void;
}

function EditProgramDialog({program, closeDialog}: EditProgramDialogProps) {

    const formSchema = z.object({
        id: z.number(),
        code: z.string().toUpperCase().min(1, {message: 'Code cannot be empty.'}),
        name: z.string().min(1, {message: 'Name cannot be empty.'}),
        degree: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: program?.id,
            code: program?.code,
            name: program?.name,
            degree: program?.degree
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await fetch('http://localhost:8080/api/v1/programs', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });

        closeDialog();
    }

    return (
        <Dialog open={!!program} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Program</DialogTitle>
                    <DialogDescription>
                        Make changes to the program here. This will affect its study plans.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Theme"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="BSc">B.Sc.</SelectItem>
                                                    <SelectItem value="BA">B.A.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function CreateProgram() {
    const [isOpen, setIsOpen] = React.useState(false);

    const program = z.object({
        code: z.string().toUpperCase().min(1, {message: 'Code cannot be empty.'}),
        name: z.string().min(1, {message: 'Name cannot be empty.'}),
        degree: z.string().min(1, {message: 'Must pick a degree.'})
    });

    const form = useForm<z.infer<typeof program>>({
        resolver: zodResolver(program),
        defaultValues: {
            code: '',
            name: '',
            degree: ''
        }
    });

    async function onSubmit(values: z.infer<typeof program>) {
        await fetch('http://localhost:8080/api/v1/programs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });

        setIsOpen(false);
    }

    console.log()

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => setIsOpen(true)}>
                <Plus /> Create Program
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Program</DialogTitle>
                    <DialogDescription>
                        This program will be publicly visible by default.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pick a degree"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="BSc">B.Sc.</SelectItem>
                                                    <SelectItem value="BA">B.A.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">Create Program</Button>
                    </form>
                </Form>
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
                            variant="outline" className="gap-3">
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
