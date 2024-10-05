import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { CourseStatus } from '@/lib/constants'
import { Dot } from 'lucide-react'

type AvailableCoursesIndicatorProps = {
  courseIds: number[]
}

export default function AvailableCoursesIndicator({
  courseIds,
}: AvailableCoursesIndicatorProps) {
  const { getCourseStatus } = useCourseStatuses()
  const availableCoursesCount = courseIds.reduce(
    (count, id) =>
      getCourseStatus(id) === CourseStatus.AVAILABLE ? count + 1 : count,
    0
  )

  if (availableCoursesCount === 0) return

  return (
    <div className="flex">
      <Dot className="text-green-500" />
      <p className="text-sm my-auto text-muted-foreground">
        {availableCoursesCount} Available
      </p>
    </div>
  )
}
 