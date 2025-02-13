import {SelectedCoursesContext} from "@/contexts/SelectedCoursesContext.ts";
import {useContext} from "react";

export function useSelectedCourses() {
    const context = useContext(SelectedCoursesContext);

    if (!context) {
        throw new Error("useSelectedCourses must be used within a SelectedCoursesProvider");
    }

    return context;
}