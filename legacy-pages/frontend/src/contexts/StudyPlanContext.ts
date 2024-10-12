import { CourseStatus } from '@/lib/constants'
import { createContext } from 'react'

interface StudyPlanContextType {
  selectedCourses: number[]
  handleSelectCourse: (clickedCourseId: number) => void
  clearSelectedCourses: () => void
  getCourseStatus: (courseId: number) => CourseStatus
  updateCourseStatus: (courseId: number, newStatus: CourseStatus) => void
  handleAddCourses: () => void
  isOpen: boolean
  closeDialog: () => void
}

export const StudyPlanContext = createContext<StudyPlanContextType | undefined>(
  undefined
)
