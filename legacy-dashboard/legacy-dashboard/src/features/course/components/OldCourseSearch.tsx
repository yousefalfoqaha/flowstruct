import {Input} from "@/shared/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Search} from "lucide-react";
import React from "react";
import {CourseSearchTable} from "@/features/course/components/CourseSearchTable.tsx";
import {useSearchCoursesForm} from "@/features/course/hooks/useSearchCoursesForm.ts";
import {Course} from "@/features/course/types.ts";

export function OldCourseSearch() {
    const [searchQuery, setSearchQuery] = React.useState<Partial<Pick<Course, "code" | "name">>>({});
    const [showTable, setShowTable] = React.useState(false);
    const form = useSearchCoursesForm();

    const handleSubmit = (data: Partial<Pick<Course, "code" | "name">>) => {
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

            <CourseSearchTable searchQuery={searchQuery} shouldSearch={showTable}/>
        </div>
    );
}

