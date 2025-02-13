import React, {ReactNode} from "react";
import {SelectedCoursesContext} from "@/contexts/SelectedCoursesContext.ts";
import {RowSelectionState} from "@tanstack/react-table";

export function SelectedCoursesProvider({children}: { children: ReactNode }) {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    return (
        <SelectedCoursesContext.Provider value={{
            rowSelection,
            setRowSelection,
            selectedCourses: Object.keys(rowSelection).map(course => JSON.parse(course))
        }}>
            {children}
        </SelectedCoursesContext.Provider>
    );
}