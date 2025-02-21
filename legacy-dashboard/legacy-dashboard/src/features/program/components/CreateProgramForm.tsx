import {Program} from "@/features/program/types.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/components/ui/select.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {useCreateProgram} from "@/features/program/hooks/useCreateProgram.ts";
import {useCreateProgramForm} from "@/features/program/hooks/useCreateProgramForm.ts";

type CreateProgramFormProps = {
    closeDialog: () => void;
}

export function CreateProgramForm({closeDialog}: CreateProgramFormProps) {
    const createProgram = useCreateProgram();
    const form = useCreateProgramForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((formData: Partial<Program>) =>
                createProgram.mutate(formData, {onSuccess: () => closeDialog()})
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

                {createProgram.isPending
                    ? <ButtonLoading/>
                    : <Button type="submit">Create Program</Button>
                }
            </form>
        </Form>
    );
}