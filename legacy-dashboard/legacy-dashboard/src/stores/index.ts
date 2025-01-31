import {useQuery} from "@tanstack/react-query";

export function useProgramListState() {
    return useQuery({
        queryKey: ['programs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8080/api/v1/programs');
            return await res.json();
        }
    });
}

export function useStudyPlanListState(programId: number | undefined) {
    return useQuery({
        queryKey: ['study-plans', programId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8080/api/v1/programs/${programId}/study-plans`);
            return await res.json();
        },
        enabled: !!programId
    });
}
