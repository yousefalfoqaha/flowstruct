import {queryOptions} from "@tanstack/react-query";
import {Course} from "@/types";

export const getCourseQuery = (courseId: number) => queryOptions({
    queryKey: ["courses", courseId],
    queryFn: async () => {
        const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        return await response.json() as Course;
    }
});