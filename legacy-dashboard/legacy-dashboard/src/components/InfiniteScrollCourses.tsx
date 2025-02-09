import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {searchCourseFormSchema} from "@/form-schemas/courseFormSchema.ts";
import {Search} from "lucide-react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getPaginatedCourses} from "@/queries/getPaginatedCourses.ts";
import React from "react";

export function InfiniteScrollCourses() {


    const form = useForm<z.infer<typeof searchCourseFormSchema>>({
        resolver: zodResolver(searchCourseFormSchema),
        defaultValues: {
            code: '',
            name: ''
        }
    });

    const {data, isPending} = useInfiniteQuery(
        getPaginatedCourses(
            form.formState.isSubmitted && !form.formState.isDirty,
            form.getValues().code,
            form.getValues().name
        )
    );

    data?.pages.map(page => {
        page.content.map(course => console.log(course.name))
    });

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {
                })}>
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
                        <Button className="mt-auto" variant="outline" type="submit"><Search/> Search</Button>
                    </div>
                    {/* Results Section */}
                    {
                        isPending
                            ? <div>Loading...</div>
                            : (
                                <div className="divide-y">
                                    {data?.pages.map((page, pageIndex) => (
                                        <React.Fragment key={pageIndex}>
                                            {page.content.map((course) => (
                                                <div key={course.code} className="py-3">
                                                    <div className="font-medium">{course.code}</div>
                                                    <div className="text-sm text-gray-600">{course.name}</div>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )
                    }
                </form>
            </Form>
        </div>
    );
}