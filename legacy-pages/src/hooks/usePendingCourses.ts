import { PendingCoursesContext } from "@/contexts/PendingCoursesContext"
import { useContext } from "react"

export function usePendingCourses() {
  const context = useContext(PendingCoursesContext)

  if (!context) {
    throw new Error(
      'usePendingCourses must be used within a PendingCoursesProvider'
    )
  }

  return context
}
    