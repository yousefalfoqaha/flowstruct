import { SectionContext } from '@/contexts/SectionContext'
import { courses } from '@/data/courses'
import { sections } from '@/data/sections'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { CourseStatus } from '@/lib/constants'

type SectionProviderProps = {
  children: React.ReactNode
  sectionId: number
}

export default function SectionProvider({
  children,
  sectionId,
}: SectionProviderProps) {
  const { courseIds, requiredCreditHours } = sections[sectionId]
  const { getCourseStatus, selectedCourses } = useStudyPlan()

  const addedCreditHours = courseIds.reduce((count, currentCourse) => {
    if (
      getCourseStatus(currentCourse) === CourseStatus.ADDED ||
      selectedCourses.includes(currentCourse)
    ) {
      return count + courses[currentCourse].creditHours
    }
    return count
  }, 0)

  const remainingCreditHours = requiredCreditHours - addedCreditHours
  const sectionIsComplete = remainingCreditHours === 0

  const availableCoursesCount = courseIds.reduce(
    (count, id) =>
      getCourseStatus(id) === CourseStatus.AVAILABLE &&
      !selectedCourses.includes(id) &&
      !sectionIsComplete
        ? count + 1
        : count,
    0
  )

  return (
    <SectionContext.Provider
      value={{ availableCoursesCount, addedCreditHours, remainingCreditHours }}
    >
      {children}
    </SectionContext.Provider>
  )
}
