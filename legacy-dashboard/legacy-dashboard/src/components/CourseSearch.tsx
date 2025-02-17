import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {searchCourseFormSchema} from "@/form-schemas/courseFormSchema";
import {Search} from "lucide-react";
import React from "react";
import {CourseSearchTable} from "@/components/CourseSearchTable";
import {Course} from "@/types";

type CourseSearchProps = {
    onAddCourses: (addedCourses: Record<number, Course>) => void;
};

export function CourseSearch({onAddCourses}: CourseSearchProps) {
    const form = useForm<z.infer<typeof searchCourseFormSchema>>({
        resolver: zodResolver(searchCourseFormSchema),
        defaultValues: {code: "", name: ""},
    });

    const [searchQuery, setSearchQuery] = React.useState({code: "", name: ""});
    const [showTable, setShowTable] = React.useState(false);

    const handleSubmit = (data: { code: string; name: string }) => {
        setSearchQuery(data);
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
            <CourseSearchTable
                searchQuery={searchQuery}
                onAddCourses={onAddCourses}
                showTable={showTable}
            />
        </div>
    );
}
