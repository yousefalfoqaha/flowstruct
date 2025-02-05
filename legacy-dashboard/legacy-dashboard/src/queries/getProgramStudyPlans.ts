import {queryOptions} from "@tanstack/react-query";

export const getProgramStudyPlans = (programId: number) => queryOptions({
    queryKey: ['study-plans', programId],
    queryFn: async () => {
        const res = await fetch(`http://localhost:8080/api/v1/programs/${programId}/study-plans`);
        return await res.json();
    },
    enabled: !!programId
});

