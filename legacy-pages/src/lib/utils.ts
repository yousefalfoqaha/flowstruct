import { Semester } from '@/data/semesters'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

  let inSemester = false
  if (semester) inSemester = true
  return { inSemester, semester }
}
