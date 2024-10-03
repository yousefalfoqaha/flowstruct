import { Semester } from '@/data/semesters'
import { createContext } from 'react'

interface SemestersContextType {
  semesters: { [key: number]: Semester }
  addCourseToSemester: (courseId: number, semesterId: number) => void
  removeCourseFromSemester: (courseId: number, semesterId: number) => void
  selectedSemesterId: number | null
  setSelectedSemesterId: (semesterId: number | null) => void
}

export const SemestersContext = createContext<SemestersContextType | undefined>(
  undefined
)