import { CourseStatus } from '@/lib/constants'
import { createContext } from 'react'

interface CourseStatusesContextType {
  courseStatuses: { [key: number]: CourseStatus }
  getCourseStatus: (courseId: number) => CourseStatus
  updateCourseStatus: (courseId: number, newStatus: CourseStatus) => void
}

export const CourseStatusesContext = createContext<
  CourseStatusesContextType | undefined
>(undefined)
