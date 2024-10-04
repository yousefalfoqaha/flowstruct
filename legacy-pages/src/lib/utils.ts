import { Course, courses } from '@/data/courses'
import { Semester } from '@/data/semesters'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CourseStatus } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SemestersMap = Record<number, Semester>

export function courseInSemester(courseId: number, semesters: SemestersMap) {
  const semester = Object.values(semesters).find((semester) =>
    semester.courseIds.includes(courseId)
  )
  return { inSemester: Boolean(semester), semester }
}

export function getInitialCourseStatus(
  course: Course,
  semesters: SemestersMap,
  selectedSemesterId: number | null
): CourseStatus {
  const { inSemester } = courseInSemester(course.id, semesters)
  if (inSemester) return CourseStatus.ADDED

  const isPrerequisiteMet = course.prerequisiteIds.every((prerequisiteId) => {
    const { semester } = courseInSemester(prerequisiteId, semesters)
    const prerequisitesNeeded = getPrerequisitesNeeded(
      prerequisiteId,
      semesters
    )
    return (
      prerequisitesNeeded.length === 0 &&
      semester &&
      selectedSemesterId &&
      semester.order < semesters[selectedSemesterId].order
    )
  })

  return isPrerequisiteMet ? CourseStatus.AVAILABLE : CourseStatus.DISABLED
}

export function getPrerequisitesNeeded(
  courseId: number,
  semesters: SemestersMap
): number[] {
  return courses[courseId].prerequisiteIds.filter(
    (id) => !courseInSemester(id, semesters).inSemester
  )
}

export function removePrerequisiteTree(
  currentSemesterId: number,
  courseId: number,
  semesters: SemestersMap,
  removeCourseFromSemester: (semesterId: number, courseId: number) => void
) {
  const visited = new Set<number>()

  function dfs(semesterId: number, courseId: number) {
    if (visited.has(courseId)) return
    visited.add(courseId)

    const currentSemester = semesters[semesterId]

    if (currentSemester.courseIds.includes(courseId)) {
      removeCourseFromSemester(currentSemester.id, courseId)
    }

    Object.values(semesters).forEach((semester) => {
      semester.courseIds.forEach((id) => {
        if (courses[id].prerequisiteIds.includes(courseId)) {
          dfs(semester.id, id)
        }
      })
    })
  }

  dfs(currentSemesterId, courseId)
}
