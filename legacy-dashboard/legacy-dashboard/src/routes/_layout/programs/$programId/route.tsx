import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getProgramDisplayName} from '@/utils/getProgramDisplayName.ts'

export const Route = createFileRoute('/_layout/programs/$programId')({
    component: () => <Outlet/>,
    loader: async ({context: {queryClient}, params}) => {
        const programId = parseInt(params.programId)

        const program = await queryClient.ensureQueryData(
            getProgramQuery(programId),
        );

        return {
            crumb: getProgramDisplayName(program),
        };
    },
})
