import { SemestersContext } from '@/contexts/SemestersContext'
import { courses } from '@/data/courses'
import { initialSemesters, Semester } from '@/data/semesters'
import { Draft } from 'immer'
import React from 'react'
import { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'

type Action =
  | {
      type: 'ADD_COURSE'
      payload: { selectedSemesterId: number; courseId: number }
    }
  | { type: 'REMOVE_COURSE'; payload: { semesterId: number; courseId: number } }

function semestersReducer(
  semesters: Draft<{ [key: number]: Semester }>,
  action: Action
) {
  const { type, payload } = action

  switch (type) {
    case 'ADD_COURSE': {
      const { selectedSemesterId, courseId } = payload
      if (!courses[courseId]) return alert('Course not found')

      semesters[selectedSemesterId].courseIds.push(courseId)
      break
    }

    case 'REMOVE_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]
      if (!course || !semester) return alert('Course or semester not found')

      semester.courseIds.splice(semester.courseIds.indexOf(courseId), 1)
      break
    }

    default:
      alert('Invalid dispatch type')
      break
  }
}

export function SemestersProvider({ children }: { children: ReactNode }) {
  const [semesters, dispatch] = useImmerReducer(
    semestersReducer,
    initialSemesters
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
    selectedSemesterId: number | null,
    courseId: number
  ) => {
    if (!selectedSemesterId) return alert('Semester not found')
    dispatch({ type: 'ADD_COURSE', payload: { selectedSemesterId, courseId } })
  }

  const removePrerequisiteTree = (courseId: number) => {
    const visited = new Set<number>()

    function dfs(courseId: number) {
      if (visited.has(courseId)) return
      visited.add(courseId)

      Object.values(semesters).forEach((semester) => {
        if (semester.courseIds.includes(courseId)) {
          dispatch({
            type: 'REMOVE_COURSE',
            payload: { semesterId: semester.id, courseId },
          })
        }

        semester.courseIds.forEach((id) => {
          if (courses[id].prerequisiteIds.includes(courseId)) {
            dfs(id)
          }
        })
      })
    }

    dfs(courseId)
  }

  const courseInSemester = (courseId: number) => {
    const semester = Object.values(semesters).find((semester) =>
      semester.courseIds.includes(courseId)
    )
    return { inSemester: Boolean(semester), semester }
  }

  return (
    <SemestersContext.Provider
      value={{
        semesters,
        addCourseToSelectedSemester,
        removePrerequisiteTree,
        selectedSemester,
        selectSemester,
        clearSelectedSemester,
        courseInSemester,
      }}
    >
      {children}
    </SemestersContext.Provider>
  )
}
