import {createRootRouteWithContext, Outlet, stripSearchParams} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {TableSearchOptions} from "@/shared/types.ts";

const defaultValues: TableSearchOptions = {
    filter: '',
    page: 0,
    size: 10,
    columnFilters: []
};

const TableSearchSchema = z.object({
    filter: z.string().catch(defaultValues.filter),
    page: z.number().catch(defaultValues.page),
    size: z.number().catch(defaultValues.size),
    columnFilters: z.array(
        z.object({
            id: z.string(),
            value: z.unknown()
        }).required()
    ).catch(defaultValues.columnFilters)
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