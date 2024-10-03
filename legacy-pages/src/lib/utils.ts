import { Course, courses } from '@/data/courses'
import { Semester } from '@/data/semesters'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CourseStatus } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SemestersMap = { [key: number]: Semester }

export function courseInSemester(
  courseId: number,
  semesters: { [key: number]: Semester }
): { inSemester: boolean; semester: Semester | undefined } {
  const semester = Object.values(semesters).find((semester) =>
    semester.courseIds.includes(courseId)
  )

  return {
    inSemester: !!semester,
    semester,
  }
}

export function getInitialCourseStatus(
  course: Course,
  semesters: { [key: number]: Semester },
  selectedSemesterId: number | null
): CourseStatus {
  const { inSemester } = courseInSemester(course.id, semesters)
  if (inSemester) return CourseStatus.ADDED

  for (const prerequisiteId of course.prerequisiteIds) {
    const { semester } = courseInSemester(prerequisiteId, semesters)
    const preRequisiteIdsNeeded = getPrerequisitesNeeded(
      prerequisiteId,
      semesters
    )
    if (
      preRequisiteIdsNeeded.length !== 0 ||
      !semester ||
      !selectedSemesterId ||
      semester.order >= semesters[selectedSemesterId].order
    ) {
      return CourseStatus.DISABLED
    }
  }

  return CourseStatus.AVAILABLE
}

export function getPrerequisitesNeeded(
  courseId: number,
  semesters: SemestersMap
): number[] {
  const prerequisitesIds = courses[courseId].prerequisiteIds
  const prerequisitesNeeded: number[] = []

  prerequisitesIds.forEach((id) => {
    const { inSemester } = courseInSemester(id, semesters)
    if (!inSemester) prerequisitesNeeded.push(id)
  })

  return prerequisitesNeeded
}

export function recursiveRemove(
  currentSemesterId: number,
  courseId: number,
  semesters: { [key: number]: Semester },
  removeCourseFromSemester: (semesterId: number, courseId: number) => void
) {
  const currentSemester = semesters[currentSemesterId]

  if (currentSemester.courseIds.includes(courseId)) {
    removeCourseFromSemester(currentSemester.id, courseId)

    Object.values(semesters).map((semester) => {
      semester.courseIds.forEach((id) => {
        const semesterCourse = courses[id]
        console.log(semesterCourse.prerequisiteIds.includes(courseId))
        if (semesterCourse.prerequisiteIds.includes(courseId)) {
          recursiveRemove(
            semester.id,
            semesterCourse.id,
            semesters,
            removeCourseFromSemester
          )
        }
      })
    })
  }
}
