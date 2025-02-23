import {createFileRoute} from '@tanstack/react-router'
import {CreateProgramModal} from "@/features/program/components/CreateProgramModal.tsx";
import {ProgramsTable} from "@/features/program/components/ProgramsTable.tsx";
import {DialogProvider} from '@/contexts/DialogContext';
import {EditProgramDetailsModal} from "@/features/program/components/EditProgramDetailsModal.tsx";
import {DeleteProgramDialog} from "@/features/program/components/DeleteProgramDialog.tsx";
import {getProgramListQuery} from "@/features/program/queries.ts";

export const Route = createFileRoute('/')({
    component: Index,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery);
    }
});

function Index() {
    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-4xl font-semibold">GJUPlans Dashboard</h1>

                <CreateProgramModal/>
            </div>

            <DialogProvider>
                {/*<EditProgramDetailsModal/>*/}
                <DeleteProgramDialog/>
                <ProgramsTable/>
            </DialogProvider>
        </div>
    );
}
