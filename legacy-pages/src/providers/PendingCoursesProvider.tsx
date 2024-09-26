import { PendingCoursesContext } from "@/contexts/PendingCoursesContext"
import { ReactNode, useState } from "react"

export function PendingCoursesProvider({ children }: { children: ReactNode }) {
  const [pendingCourses, setPendingCourses] = useState<number[]>([])

  const pendCourse = (courseId: number) => {
    setPendingCourses([...pendingCourses, courseId])
  }

  const unpendCourse = (courseId: number) => {
    setPendingCourses(pendingCourses.filter((id) => id !== courseId))
  }

  const clearPendingCourses = () => {
    setPendingCourses([])
  }

  return (
    <PendingCoursesContext.Provider
      value={{ pendingCourses, pendCourse, unpendCourse, clearPendingCourses }}
    >
      {children}
    </PendingCoursesContext.Provider>
  )
}
