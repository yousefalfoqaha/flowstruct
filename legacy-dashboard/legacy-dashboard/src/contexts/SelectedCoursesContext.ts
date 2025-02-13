import {createContext, Dispatch, SetStateAction} from "react";
import {Course} from "@/types";
import {RowSelectionState} from "@tanstack/react-table";

type SelectedCoursesContextType = {
    rowSelection: RowSelectionState;
    setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
    selectedCourses: Course[];
}

export const SelectedCoursesContext = createContext<SelectedCoursesContextType | undefined>(
    undefined
);