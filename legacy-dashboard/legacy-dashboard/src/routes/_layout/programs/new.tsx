import {createFileRoute} from '@tanstack/react-router'
import {CreateProgramFieldset} from '@/features/program/components/CreateProgramFieldset.tsx'
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

export const Route = createFileRoute('/_layout/programs/new')({
    loader: () => ({crumb: 'Create New Program'}),
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <PageLayout
            header={
                <PageHeaderWithBack
                    title="Create New Program"
                    linkProps={{
                        to: '/programs',
                        search: getDefaultSearchValues
                    }}
                />
            }
        >
            <CreateProgramFieldset/>
        </PageLayout>
    );
}
