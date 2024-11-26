import {QueryKey, useQuery, useQueryClient} from "@tanstack/react-query";

export function createGlobalState<T>(
    queryKey: QueryKey,
    fetchFn: () => Promise<T>,
    options: {enabled?: boolean} = {}
) {
    return () => {
        const queryClient = useQueryClient();

        const queryResult = useQuery({
            queryKey: queryKey,
            queryFn: fetchFn,
            enabled: options.enabled
        });

        function setData(data: Partial<T>) {
            queryClient.setQueryData(queryKey, data);
        }

        return {queryResult, setData};
    };
}