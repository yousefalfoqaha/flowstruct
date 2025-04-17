import {createFileRoute, Outlet, retainSearchParams, stripSearchParams} from '@tanstack/react-router'
import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";
import {z} from "zod";

const defaultValues = {
    filter: '',
    page: 0,
    size: 10
};

const studyPlanSearchSchema = z.object({
    filter: z.string().catch(defaultValues.filter),
    page: z.number().catch(defaultValues.page),
    size: z.number().catch(defaultValues.size)
});

export const Route = createFileRoute('/_layout/study-plans')({
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getStudyPlanListQuery());
        await queryClient.ensureQueryData(getProgramListQuery);

        return {
            crumb: 'Study Plans',
        };
    },
    validateSearch: studyPlanSearchSchema,
    search: {
        middlewares: [
            retainSearchParams(['filter', 'page', 'size']),
            stripSearchParams(defaultValues),
        ],
    },
    component: () => <Outlet/>,
});
