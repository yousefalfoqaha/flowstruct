import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ProgramOption, StudyPlanOption} from "@/types";
import {Book, EllipsisVertical, Loader2, Pencil, Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {useProgramListState, useStudyPlanListState} from "@/stores";
import React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createProgramFormSchema, programFormSchema} from "@/form-schemas/programFormSchema.ts";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {ToastAction} from "@/components/ui/toast.tsx";

enum ProgramDialog {
    Edit = 'edit',
    Delete = 'delete',
    StudyPlans = 'study-plans'
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <div className="space-y-6 p-8">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-4xl font-semibold">All GJU Programs</h1>
                    <CreateProgram/>
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

export function ButtonLoading() {
    return (
        <Button disabled className="w-fit">
            <Loader2 className="animate-spin"/>
            Please wait
        </Button>
    )
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
    const form = useForm<z.infer<typeof programFormSchema>>({
        resolver: zodResolver(programFormSchema),
        defaultValues: {...program}
    });

    const {toast} = useToast();

    const mutation = useMutation({
        mutationFn: async (updatedProgram: z.infer<typeof programFormSchema>) => {
            const response = await fetch('http://localhost:8080/api/v1/programs', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedProgram)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: (updatedProgram) => {
            queryClient.setQueryData(['programs'], (oldPrograms: ProgramOption[] | undefined) => {
                if (!oldPrograms) return [];
                return oldPrograms.map(p => (p.id === updatedProgram.id ? updatedProgram : p));
            });

            closeDialog();
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

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
                    <form onSubmit={form.handleSubmit(mutation.mutate)} className="space-y-6">
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
                        {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Save Changes</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function CreateProgram() {
    const [isOpen, setIsOpen] = React.useState(false);
    const {toast} = useToast();

    const form = useForm<z.infer<typeof createProgramFormSchema>>({
        resolver: zodResolver(createProgramFormSchema),
        defaultValues: {
            code: '',
            name: '',
            degree: ''
        }
    });

    const mutation = useMutation({
        mutationFn: async (newProgram: z.infer<typeof createProgramFormSchema>) => {
            const response = await fetch('http://localhost:8080/api/v1/programs', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newProgram)
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: (newProgram) => {
            queryClient.setQueryData(['programs'], (programs: ProgramOption[] | undefined) => {
                if (!programs) return [];
                return [...programs, newProgram];
            });

            setIsOpen(false);

            toast({description: "Program created successfully."});
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => setIsOpen(true)}>
                <Plus/> Create Program
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Program</DialogTitle>
                    <DialogDescription>
                        This program will be private by default.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(mutation.mutate)} className="space-y-6">
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

                        {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Create Program</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

type DeleteProgramConfirmation = {
    program: ProgramOption;
    closeDialog: () => void;
}

function DeleteProgramConfirmation({program, closeDialog}: DeleteProgramConfirmation) {
    const {toast} = useToast();

    const mutation = useMutation({
        mutationFn: async (toBeDeletedProgram: ProgramOption) => {
            const response = await fetch(`http://localhost:8080/api/v1/programs/${toBeDeletedProgram.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: (_, toBeDeletedProgram) => {
            queryClient.setQueryData(['programs'], (programs: ProgramOption[] | undefined) => {
                if (!programs) return [];
                return programs.filter(p => p.id !== toBeDeletedProgram.id);
            });

            closeDialog();

            toast({description: "Program deleted successfully."});
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'An error occurred while trying to delete the program.',
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
        }
    });


    return (
        <Dialog open={!!program} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {program.name} Program</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you absolutely sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {mutation.isPending
                        ? <ButtonLoading/>
                        : <Button className="w-fit" variant="destructive" onClick={() => mutation.mutate(program)}>
                            <Trash/> Delete Program
                        </Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
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
                            variant="outline">
                        <Book/> Study Plans
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="rounded-full">
                                <EllipsisVertical/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => openDialog(row.original, ProgramDialog.Edit)}>
                                Edit
                            </DropdownMenuItem>
                            {/*<DropdownMenuItem>Archive</DropdownMenuItem>*/}
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => openDialog(row.original, ProgramDialog.Delete)}>
                                <Trash/> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
            {programDialog === ProgramDialog.Delete &&
                <DeleteProgramConfirmation program={selectedProgram} closeDialog={closeDialog}/>
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
