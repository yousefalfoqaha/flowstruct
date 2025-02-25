import {createFileRoute} from '@tanstack/react-router'
import {CreateProgramModal} from "@/features/program/components/CreateProgramModal.tsx";
import {ProgramsTable} from "@/features/program/components/ProgramsTable.tsx";
import {getProgramListQuery} from "@/features/program/queries.ts";

export const Route = createFileRoute('/')({
    component: Index,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery);
    }
});

function Index() {
    return (
        <>
            <CreateProgramModal/>
            <ProgramsTable/>
        </>
    );
}
