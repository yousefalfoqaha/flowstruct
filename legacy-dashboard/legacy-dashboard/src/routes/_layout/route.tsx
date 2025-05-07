import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {AppLayout} from '@/shared/components/AppLayout.tsx'
import Cookies from "js-cookie";
import {MeQuery} from "@/features/auth/queries.ts";

export const Route = createFileRoute('/_layout')({
    beforeLoad: async ({location}) => {
        const token = Cookies.get('token');
        if (!token) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(MeQuery);
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
