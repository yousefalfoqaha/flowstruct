import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {AppLayout} from '@/shared/components/AppLayout.tsx'
import Cookies from "js-cookie";

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
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    );
}
