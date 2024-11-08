import { SectionContext } from '@/contexts/SectionContext'
import { Course } from '@/data/courses'
import { Section } from '@/data/sections'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { CourseStatus } from '@/lib/constants'

type SectionProviderProps = {
  children: React.ReactNode
  section: Section
}

export default function SectionProvider({
  children,
  section,
}: SectionProviderProps) {
  const { courses, requiredCreditHours } = section
  const { getCourseStatus, selectedCourses } = useStudyPlan()

  const addedCreditHours = courses.reduce((count, currentCourse) => {
    if (
      getCourseStatus(currentCourse.id) === CourseStatus.ADDED ||
      selectedCourses.includes(currentCourse.id)
    ) {
      return count + currentCourse.creditHours
    }
    return count
  }, 0)

  const remainingCreditHours = requiredCreditHours - addedCreditHours

  const availableCourses: Course[] = []

  courses.forEach((course: Course) => {
    if (
      getCourseStatus(course.id) === CourseStatus.AVAILABLE &&
      !selectedCourses.includes(course.id) &&
      remainingCreditHours !== 0
    )
      availableCourses.push(course)
  })

  console.log(requiredCreditHours)

  return (
    <SectionContext.Provider
      value={{ availableCourses, addedCreditHours, remainingCreditHours }}
    >
      {children}
    </SectionContext.Provider>
  )
}
