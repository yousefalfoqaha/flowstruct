import { createFileRoute } from '@tanstack/react-router'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {CreateProgramDialog} from "@/components/CreateProgramDialog.tsx";
import {ProgramsTable} from "@/components/ProgramsTable.tsx";


export const Route = createFileRoute('/')({
  component: Index,
});

const queryClient = new QueryClient();

function Index() {
  return (
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}/>
          <div className="space-y-6 p-8">
              <div className="flex justify-between items-center gap-4">
                  <h1 className="text-4xl font-semibold">GJUPlans Dashboard</h1>

                  <CreateProgramDialog/>
              </div>

              <ProgramsTable/>
          </div>
      </QueryClientProvider>
  );
}
