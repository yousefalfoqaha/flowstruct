import {infiniteQueryOptions} from "@tanstack/react-query";
import {CoursesPage} from "@/types";

export const getPaginatedCourses = (isEnabled: boolean, code: string, name: string) => infiniteQueryOptions({
    queryKey: ['courses', {code, name}],
    queryFn: async ({pageParam}) => {
        const res = await fetch(`http://localhost:8080/api/v1/courses?code=${code}&name=${name}&page=${pageParam}&size=5`);
        return await res.json() as CoursesPage;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    enabled: isEnabled
});
