import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getProgramListQuery} from "@/features/program/queries.ts";

export const Route = createFileRoute('/_layout/programs')({
    component: () => <Outlet/>,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery);
        return {crumb: 'Programs'}
    },
});