import { Semester } from "@/data/semesters"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function courseInSemester(
  courseId: number,
  semesters: { [key: number]: Semester }
): boolean {
  return Object.values(semesters).some((semester) =>
    semester.courseIds.includes(courseId)
  )
}
