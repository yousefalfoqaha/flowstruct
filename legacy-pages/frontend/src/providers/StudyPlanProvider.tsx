import { StudyPlanContext } from '@/contexts/StudyPlanContext'
import { Course, courses } from '@/data/courses'
import { semesters } from '@/data/semesters'
import { useFlowsheet } from '@/hooks/useFlowsheet'
import { CourseStatus } from '@/lib/constants'
import React from 'react'

type StudyPlanProviderProps = {
  children: React.ReactNode
}

export default function StudyPlanProvider({
  children,
}: StudyPlanProviderProps) {
  const {
    courseMappings,
    selectedSemester,
    clearSelectedSemester,
    addCourseToSelectedSemester,
  } = useFlowsheet()
  
  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([])
  
  const handleAddCourses = () => {
    selectedCourses.forEach((selectedId: number) => {
      if (getCourseStatus(selectedId) !== CourseStatus.AVAILABLE) {
        const unavailableCourse = courses[selectedId]
        return alert(`${unavailableCourse.name} is not available`)
      }

      if (!selectedSemester) return alert('Semester not found')

      addCourseToSelectedSemester(selectedId, selectedSemester)
    })
  }

  const getInitialCourseStatus = (
    course: Course,
    selectedSemester: number | null
  ): CourseStatus => {
    if (courseMappings.get(course.id)) return CourseStatus.ADDED

    // refactor into utils
    const isPrerequisiteMet = course.prerequisiteIds.every((prerequisiteId) => {
      const semesterWithPrerequisite = courseMappings.get(prerequisiteId)

      const prerequisitesNeeded = courses[
        prerequisiteId
      ].prerequisiteIds.filter((id) => !courseMappings.get(id))

      return (
        prerequisitesNeeded.length === 0 &&
        semesterWithPrerequisite &&
        selectedSemester &&
        semesters[semesterWithPrerequisite].order <
          semesters[selectedSemester].order
      )
    })

    return isPrerequisiteMet ? CourseStatus.AVAILABLE : CourseStatus.DISABLED
  }

  const courseStatuses = Object.keys(courses).reduce(
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

  const getCourseStatus = (courseId: number) => {
    return courseStatuses[courseId]
  }


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
        handleAddCourses,
        closeDialog,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  )
}
