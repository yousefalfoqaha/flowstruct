//import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {ProgramOption} from "@/types";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProgramsTable />
        </QueryClientProvider>
    );
}

export default App;

function ProgramsTable() {
    const fetchPrograms = async () => {
        const res = await fetch('http://localhost:8080/api/v1/programs');
        return await res.json();
    }

    const programsQuery = useQuery({
        queryKey: ['programs'],
        queryFn: fetchPrograms
    });

    return (
        <>
            {programsQuery.data?.map(program => {
                console.log(program);

                return <div key={program.id} className="p-2 font-semibold border w-fit m-2 rounded-lg px-4">
                    {program.name} ({program.code})
                </div>
            })}
        </>
    );
}