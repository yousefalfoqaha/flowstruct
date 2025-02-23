import {useQueryClient} from "@tanstack/react-query";
import {Course} from "@/features/course/types.ts";

export const useCourseList = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData<Record<number, Course>>(["courses"]);
}
