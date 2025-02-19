import {createFileRoute} from '@tanstack/react-router'
import {CreateProgramDialog} from "@/components/CreateProgramDialog.tsx";
import {ProgramsTable} from "@/components/ProgramsTable.tsx";
import {getPrograms} from "@/queries/getPrograms.ts";
import { DialogProvider } from '@/contexts/DialogContext';
import {EditProgramDialog} from "@/components/EditProgramDialog.tsx";
import {DeleteProgramDialog} from "@/components/DeleteProgramDialog.tsx";

export const Route = createFileRoute('/')({
    component: Index,
    loader: async ({context: {queryClient}}) => {
        return queryClient.ensureQueryData(getPrograms());
    }
});

function Index() {
    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-4xl font-semibold">GJUPlans Dashboard</h1>

                <CreateProgramDialog/>
            </div>

            <DialogProvider>
                <EditProgramDialog/>
                <DeleteProgramDialog/>
                <ProgramsTable/>
            </DialogProvider>
        </div>
    );
}
