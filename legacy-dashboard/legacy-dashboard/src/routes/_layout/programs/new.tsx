import {createFileRoute} from '@tanstack/react-router'
import {CreateProgramFieldset} from '@/features/program/components/CreateProgramFieldset.tsx'
import {CreatePageLayout} from "@/shared/components/CreatePageLayout.tsx";

export const Route = createFileRoute('/_layout/programs/new')({
    loader: () => ({crumb: 'Create New Program'}),
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <CreatePageLayout title="Create new Program" backLink="/programs">
            <CreateProgramFieldset/>
        </CreatePageLayout>
    );
}
