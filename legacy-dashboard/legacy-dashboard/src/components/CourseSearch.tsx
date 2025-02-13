import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {searchCourseFormSchema} from "@/form-schemas/courseFormSchema.ts";
import {Search} from "lucide-react";
import {CourseSearchResults} from "@/components/CourseSearchResults.tsx";
import React from "react";

export function CourseSearch({semester}: {semester: number}) {
    const form = useForm<z.infer<typeof searchCourseFormSchema>>({
        resolver: zodResolver(searchCourseFormSchema),
        defaultValues: {
            code: '',
            name: ''
        } as z.infer<typeof searchCourseFormSchema>
    });

    const [searchQuery, setSearchQuery] = React.useState<{ code: string; name: string }>({
        code: '',
        name: ''
    });

    const [showTable, setShowTable] = React.useState(false);

    const handleSubmit = (formData) => {
        setSearchQuery(formData);
        setShowTable(true);
    };

    return (
        <div className="space-y-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit, () => setShowTable(false))}>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <FormItem className="w-1/3">
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

                        <Button className="mt-auto" variant="outline" type="submit">
                            <Search/> Search
                        </Button>
                    </div>

                </form>
            </Form>

            <CourseSearchResults semester={semester} showTable={showTable} searchQuery={searchQuery}/>
        </div>
    );
}