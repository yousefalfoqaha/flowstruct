import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {AppLayout} from '@/shared/components/AppLayout.tsx'
import {MeQuery} from "@/features/user/queries.ts";

export const Route = createFileRoute('/_layout')({
    beforeLoad: async ({context: {queryClient}}) => {
        try {
            await queryClient.ensureQueryData(MeQuery);
        } catch {
            throw redirect({ to: '/login' });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    );
}
