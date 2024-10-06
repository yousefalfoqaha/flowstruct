import { StudyPlanContext } from '@/contexts/StudyPlanContext'
import { Course, courses } from '@/data/courses'
import { useSemesters } from '@/hooks/useSemesters'
import { CourseStatus } from '@/lib/constants'
import React from 'react'

type StudyPlanProviderProps = {
  children: React.ReactNode
}

export default function StudyPlanProvider({
  children,
}: StudyPlanProviderProps) {
  const {
    semesters,
    courseInSemester,
    selectedSemester,
    clearSelectedSemester,
    addCourseToSelectedSemester,
  } = useSemesters()

  const isOpen = selectedSemester !== null

  const handleAddCourses = () => {
    selectedCourses.forEach((selectedId: number) => {
      if (getCourseStatus(selectedId) !== CourseStatus.AVAILABLE) {
        const unavailableCourse = courses[selectedId]
        return alert(`${unavailableCourse.name} is not available`)
      }

      addCourseToSelectedSemester(selectedSemester, selectedId)
    })
  }

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

  const initialCourseStatuses = Object.keys(courses).reduce(
    (acc, key: string) => {
      const courseId = parseInt(key)
      acc[courseId] = getInitialCourseStatus(
        courses[courseId],
        selectedSemester
      )
      return acc
    },
    {} as { [key: number]: CourseStatus }
  )

  const [courseStatuses, setCourseStatuses] = React.useState<{
    [key: number]: CourseStatus
  }>(initialCourseStatuses)

  const getCourseStatus = (courseId: number) => {
    return courseStatuses[courseId]
  }

  const updateCourseStatus = (courseId: number, newStatus: CourseStatus) => {
    const newCourseStatuses = Object.fromEntries(
      Object.entries(courseStatuses).map(([currentId, status]) => {
        if (parseInt(currentId) === courseId) {
          return [currentId, newStatus]
        }
        return [currentId, status]
      })
    )
    setCourseStatuses(newCourseStatuses)
  }

  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([])

  const handleSelectCourse = (clickedCourseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(clickedCourseId)
        ? prev.filter((courseId) => courseId !== clickedCourseId)
        : [...prev, clickedCourseId]
    )
  }

  const clearSelectedCourses = () => setSelectedCourses([])
  
  const closeDialog = () => {
    clearSelectedSemester()
    clearSelectedCourses()
  }

  return (
    <StudyPlanContext.Provider
      value={{
        selectedCourses,
        handleSelectCourse,
        clearSelectedCourses,
        getCourseStatus,
        updateCourseStatus,
        handleAddCourses,
        isOpen,
        closeDialog,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  )
}
