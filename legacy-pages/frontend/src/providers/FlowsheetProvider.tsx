import { FlowsheetContext } from '@/contexts/FlowsheetContext'
import { courses } from '@/data/courses'
import { semesters } from '@/data/semesters'
import React from 'react'
import { ReactNode } from 'react'

export function FlowsheetProvider({ children }: { children: ReactNode }) {
  const [courseMappings, setCourseMappings] = React.useState(
    new Map<number, number>()
  )

  const [selectedSemester, setSelectedSemester] = React.useState<number | null>(
    null
  )

  const selectSemester = (semesterId: number) => {
    if (!semesters[semesterId]) return alert('Semester not found')
    setSelectedSemester(semesterId)
  }

  const clearSelectedSemester = () => {
    setSelectedSemester(null)
  }

  const addCourseToSelectedSemester = (
    courseId: number,
    selectedSemesterId: number
  ) => {
    if (!selectedSemesterId || !semesters[selectedSemesterId])
      return alert('Semester not found')

    setCourseMappings((previousMap) => {
      const newMap = new Map(previousMap)
      newMap.set(courseId, selectedSemesterId)
      return newMap
    })
  }

  const removeCourseFromFlowsheet = (courseId: number) => {
    if (!courses[courseId]) return alert('Course not found')

    setCourseMappings((previousMap) => {
      const newMap = new Map(previousMap)
      newMap.delete(courseId)
      return newMap
    })
  }

  const removePrerequisiteTree = (courseId: number) => {
    const visited = new Set<number>()

    function dfs(courseId: number) {
      if (visited.has(courseId)) return
      visited.add(courseId)

      if (courseMappings.get(courseId)) removeCourseFromFlowsheet(courseId)
    }

    Object.keys(courseMappings).forEach((key) => {
      const courseKey = parseInt(key)
      if (courses[courseKey].prerequisiteIds.includes(courseId)) dfs(courseKey)
    })

    dfs(courseId)
  }

  return (
    <FlowsheetContext.Provider
      value={{
        courseMappings,
        addCourseToSelectedSemester,
        removePrerequisiteTree,
        selectedSemester,
        selectSemester,
        clearSelectedSemester,
      }}
    >
      {children}
    </FlowsheetContext.Provider>
  )
}
