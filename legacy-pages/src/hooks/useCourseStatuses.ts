import { CourseStatusesContext } from '@/contexts/CourseStatusesContext'
import { useContext } from 'react'

export function useCourseStatuses() {
  const context = useContext(CourseStatusesContext)

  if (!context)
    throw Error(
      'CourseStatusesContext must be used within a CourseStatusesProvider'
    )

  return context
}
