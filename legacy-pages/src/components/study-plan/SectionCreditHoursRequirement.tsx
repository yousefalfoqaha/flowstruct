import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { Progress } from '../ui/progress'
import { CourseStatus } from '@/lib/constants'
import { courses } from '@/data/courses'
import AvailableCoursesIndicator from './AvailableCoursesIndicator'

type SectionCreditHoursRequirementProps = {
  requiredCreditHours: number
  courseIds: number[]
  selectedCourses: number[]
}

export default function SectionCreditHoursRequirement({
  requiredCreditHours,
  courseIds,
  selectedCourses,
}: SectionCreditHoursRequirementProps) {
  const { getCourseStatus } = useCourseStatuses()

  const addedCreditHours = courseIds.reduce((count, currentCourse) => {
    if (
      getCourseStatus(currentCourse) === CourseStatus.ADDED ||
      selectedCourses.includes(currentCourse)
    ) {
      const addedCourseCreditHours = courses[currentCourse].creditHours
      return count + addedCourseCreditHours
    }
    return count
  }, 0)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex mx-auto">
        <p className="text-sm text-muted-foreground text-left my-auto">
          {requiredCreditHours - addedCreditHours} Cr Hr Remaining
        </p>
        <AvailableCoursesIndicator courseIds={courseIds} />
      </div>
      <Progress
        className="h-2  my-auto"
        value={(addedCreditHours / requiredCreditHours) * 100}
      />
    </div>
  )
}
