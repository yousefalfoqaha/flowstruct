import { CourseStatusesContext } from '@/contexts/CourseStatusesContext'
import { Course, courses } from '@/data/courses'
import { useSemesters } from '@/hooks/useSemesters'
import { CourseStatus } from '@/lib/constants'
import React from 'react'

type CourseStatusesProviderProps = {
  children: React.ReactNode
}

export function CourseStatusesProvider({
  children,
}: CourseStatusesProviderProps) {
  const courseKeys = Object.keys(courses)
  const { semesters, courseInSemester, selectedSemester } = useSemesters()

  const getInitialCourseStatus = (
    course: Course,
    selectedSemester: number | null
  ): CourseStatus => {
    const { inSemester } = courseInSemester(course.id)
    if (inSemester) return CourseStatus.ADDED

    // refactor into utils
    const isPrerequisiteMet = course.prerequisiteIds.every((prerequisiteId) => {
      const { semester: semesterWithPrerequisite } =
        courseInSemester(prerequisiteId)
      const prerequisitesNeeded = courses[
        prerequisiteId
      ].prerequisiteIds.filter((id) => !courseInSemester(id).inSemester)

      return (
        prerequisitesNeeded.length === 0 &&
        semesterWithPrerequisite &&
        selectedSemester &&
        semesterWithPrerequisite.order < semesters[selectedSemester].order
      )
    })

    return isPrerequisiteMet ? CourseStatus.AVAILABLE : CourseStatus.DISABLED
  }

  const initialCourseStatuses = courseKeys.reduce((acc, key: string) => {
    const courseId = parseInt(key)
    acc[courseId] = getInitialCourseStatus(courses[courseId], selectedSemester)
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
