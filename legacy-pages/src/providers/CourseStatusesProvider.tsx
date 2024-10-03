import { CourseStatusesContext } from '@/contexts/CourseStatusesContext'
import { courses } from '@/data/courses'
import { useSemesters } from '@/hooks/useSemesters'
import { CourseStatus } from '@/lib/constants'
import { getInitialCourseStatus } from '@/lib/utils'
import React from 'react'

export function CourseStatusesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const courseKeys = Object.keys(courses)
  const { semesters, selectedSemesterId } = useSemesters()

  const initialCourseStatuses = courseKeys.reduce((acc, key: string) => {
    const parsedKey = parseInt(key)
    acc[parsedKey] = getInitialCourseStatus(
      courses[parsedKey],
      semesters,
      selectedSemesterId
    )
    return acc
  }, {} as { [key: number]: CourseStatus })

  const [courseStatuses] = React.useState<{
    [key: number]: CourseStatus
  }>(initialCourseStatuses)

  const getCourseStatus = (courseId: number) => {
    return courseStatuses[courseId]
  }

  return (
    <CourseStatusesContext.Provider value={{ courseStatuses, getCourseStatus }}>
      {children}
    </CourseStatusesContext.Provider>
  )
}
