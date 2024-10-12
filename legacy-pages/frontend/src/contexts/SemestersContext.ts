import { Semester } from '@/data/semesters'
import { createContext } from 'react'

interface SemestersContextType {
  semesters: { [key: number]: Semester }
  addCourseToSelectedSemester: (selectedSemesterId: number | null, courseId: number) => void
  removePrerequisiteTree: (courseId: number) => void
  selectedSemester: number | null
  selectSemester: (semesterId: number) => void
  clearSelectedSemester: () => void
  courseInSemester: (courseId: number) => {
    inSemester: boolean
    semester: Semester | undefined
  }
}

export const SemestersContext = createContext<SemestersContextType | undefined>(
  undefined
)
