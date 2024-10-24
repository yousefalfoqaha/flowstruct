import { createContext } from 'react'

interface FlowsheetContextType {
  courseMappings: Map<number, number>
  addCourseToSelectedSemester: (
    courseId: number,
    selectedSemesterId: number
  ) => void
  removePrerequisiteTree: (courseId: number) => void
  selectedSemester: number | null
  selectSemester: (semesterId: number) => void
  clearSelectedSemester: () => void
}

export const FlowsheetContext = createContext<FlowsheetContextType | undefined>(
  undefined
)
