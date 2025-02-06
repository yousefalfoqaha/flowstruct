import React from "react";
import {useToast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createProgramFormSchema} from "@/form-schemas/programFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProgramOption} from "@/types";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";

export function CreateProgramDialog() {
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

    const queryClient = useQueryClient();

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
        onSuccess: (newProgram: ProgramOption) => {
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