import {useQueryClient} from "@tanstack/react-query";
import {Course} from "@/types";

export const useCourses = () => {
    const queryClient = useQueryClient();

    const getCourse = (courseId: number) => {
        return queryClient.getQueryData(["courses", courseId]) as Course | undefined;
    };

    const getCourses = (courseIds: number[]) => {
        return courseIds.reduce<Course[]>((acc, courseId) => {
            const course = getCourse(courseId);
            if (course) acc.push(course);
            return acc;
        }, []);
    };

    const saveCourse = (course: Course) => {
        queryClient.setQueryData(["courses", course.id], course);
    };

    return {getCourse, getCourses, saveCourse};
}