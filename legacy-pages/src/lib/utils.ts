import { Course, courses } from '@/data/courses'
import { Semester } from '@/data/semesters'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CourseStatus } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function getCourseStatus(
  course: Course,
  selectedCourses: Course[],
  semesters: { [key: number]: Semester },
  selectedSemesterId: number
): CourseStatus {
  if (selectedCourses.includes(course)) return CourseStatus.SELECTED

  const { inSemester } = courseInSemester(course.id, semesters)
  if (inSemester) return CourseStatus.ADDED

  for (const prerequisiteId of course.prerequisiteIds) {
    const { inSemester, semester } = courseInSemester(prerequisiteId, semesters)
    if (
      !inSemester ||
      !semester ||
      semester.order >= semesters[selectedSemesterId].order
    ) {
      return CourseStatus.DISABLED
    }
  }

  return CourseStatus.AVAILABLE
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
      if (semester.order > currentSemester.order) {
        semester.courseIds.forEach((id) => {
          const semesterCourse = courses[id]

          if (semesterCourse.prerequisiteIds.includes(courseId)) {
            recursiveRemove(
              semester.id,
              semesterCourse.id,
              semesters,
              removeCourseFromSemester
            )
          }
        })
      }
    })
  }
}
