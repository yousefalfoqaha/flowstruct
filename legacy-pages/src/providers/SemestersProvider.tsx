import { SemestersContext } from '@/contexts/SemestersContext'
import { courses } from '@/data/courses'
import { initialSemesters, Semester } from '@/data/semesters'
import { courseInSemester } from '@/lib/utils'
import { Draft } from 'immer'
import { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'

type Action =
  | { type: 'ADD_COURSE'; payload: { semesterId: number; courseId: number } }
  | { type: 'REMOVE_COURSE'; payload: { semesterId: number; courseId: number } }

function semestersReducer(
  semesters: Draft<{ [key: number]: Semester }>,
  action: Action
) {
  const { type, payload } = action

  switch (type) {
    case 'ADD_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]
      const { inSemester } = courseInSemester(courseId, semesters)
      if (!course || !semester) return alert('Course or semester not found')
      if (inSemester)
        return alert(`${course.name} is already added to a semester`)

      semester.courseIds.push(courseId)
      break
    }

    case 'REMOVE_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]
      const { inSemester } = courseInSemester(courseId, semesters)
      if (!course) return alert(`Course not found`)
      if (!semester) return alert(`Semester not found`)
      if (!inSemester) return alert(`${course.name} is not in a semester`)

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

  const addCourseToSemester = (semesterId: number, courseId: number) => {
    dispatch({ type: 'ADD_COURSE', payload: { semesterId, courseId } })
  }

  const removeCourseFromSemester = (semesterId: number, courseId: number) => {
    dispatch({ type: 'REMOVE_COURSE', payload: { semesterId, courseId } })
  }

  return (
    <SemestersContext.Provider
      value={{
        semesters,
        addCourseToSemester,
        removeCourseFromSemester,
      }}
    >
      {children}
    </SemestersContext.Provider>
  )
}
