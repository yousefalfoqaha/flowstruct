import {createFileRoute, retainSearchParams, stripSearchParams} from '@tanstack/react-router'
import {Stack} from "@mantine/core";
import {BookOpen} from "lucide-react";
import {CoursesTable} from "@/features/course/components/CoursesTable.tsx";
import {TableSearchSchema} from "@/shared/schemas.ts";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {PageHeader} from "@/shared/components/PageHeader.tsx";

export const Route = createFileRoute('/_layout/courses/')({
    component: RouteComponent,
    validateSearch: TableSearchSchema,
    search: {
        middlewares: [
            stripSearchParams(getDefaultSearchValues()),
            retainSearchParams(['page', 'size'])
        ]
    },
});

function RouteComponent() {
    return (
        <Stack gap="lg">
            <PageHeader title="Courses" icon={<BookOpen/>}/>
            <CoursesTable/>
        </Stack>
    );
}
