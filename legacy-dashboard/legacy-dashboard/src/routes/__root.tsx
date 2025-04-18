import {createRootRouteWithContext, Outlet, stripSearchParams} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {z} from "zod";

const defaultValues = {
    filter: '',
    page: 0,
    size: 10
};

const TableSearchSchema = z.object({
    filter: z.string().default(defaultValues.filter),
    page: z.number().default(defaultValues.page),
    size: z.number().default(defaultValues.size)
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient, breadcrumbs: string[] }>()({
    component: Root,
    validateSearch: TableSearchSchema,
    search: {
        middlewares: [stripSearchParams(defaultValues)],
    },
});

function Root() {
    return <Outlet/>;
}