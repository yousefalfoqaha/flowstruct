import {ProgramOption} from "@/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {editProgramFormSchema} from "@/form-schemas/programFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";

type EditProgramDialogProps = {
    program: ProgramOption | null;
    closeDialog: () => void;
}

export function EditProgramDialog({program, closeDialog}: EditProgramDialogProps) {
    const form = useForm<z.infer<typeof editProgramFormSchema>>({
        resolver: zodResolver(editProgramFormSchema),
        defaultValues: {...program}
    });

    const queryClient = useQueryClient();

    const {toast} = useToast();

    const mutation = useMutation({
        mutationFn: async (updatedProgram: z.infer<typeof editProgramFormSchema>) => {
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
        onSuccess: (updatedProgram: ProgramOption) => {
            queryClient.setQueryData(['programs'], (oldPrograms: ProgramOption[] | undefined) => {
                if (!oldPrograms) return [];
                return oldPrograms.map(p => (p.id === updatedProgram.id ? updatedProgram : p));
            });

            closeDialog();

            toast({description: 'Program updated successfully.'});
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
                    <form onSubmit={form.handleSubmit((formData) =>
                        mutation.mutate(formData)
                    )} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name*</FormLabel>
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
                                        <FormLabel>Code*</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Eg. "MECH, CS, MGT..."' autoComplete="off"/>
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
                                        <FormLabel>Degree*</FormLabel>
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