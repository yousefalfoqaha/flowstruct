import {createFileRoute, retainSearchParams, stripSearchParams} from '@tanstack/react-router'
import {Group, Stack, Title} from "@mantine/core";
import {BookOpen} from "lucide-react";
import {CoursesTable} from "@/features/course/components/CoursesTable.tsx";
import {TableSearchSchema} from "@/shared/schemas.ts";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";

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
        <Stack>
            <Group>
                <BookOpen/>
                <Title order={2} fw={600}>Courses</Title>
            </Group>

            <CoursesTable/>
        </Stack>
    );
}

