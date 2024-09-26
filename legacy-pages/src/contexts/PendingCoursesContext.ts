import { createContext } from 'react'

type PendingCoursesContextType = {
  pendingCourses: number[]
  pendCourse: (courseId: number) => void
  unpendCourse: (courseId: number) => void
  clearPendingCourses: () => void
}

export const PendingCoursesContext = createContext<
  PendingCoursesContextType | undefined
>(undefined)
