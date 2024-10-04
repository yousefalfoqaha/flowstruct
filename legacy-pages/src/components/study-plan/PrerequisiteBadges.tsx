import { courses } from '@/data/courses'
import { Badge } from '../ui/badge'
import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { CourseStatus } from '@/lib/constants'

type PrerequisiteBadges = {
  prerequisiteIds: number[]
}

export default function PrerequisiteBadges({
  prerequisiteIds,
}: PrerequisiteBadges) {
  const { getCourseStatus } = useCourseStatuses()

  return (
    <div className="flex flex-wrap gap-1">
      {prerequisiteIds.map((prereqId) => {
        const prerequisiteCourse = courses[prereqId]

        return (
          <li key={prereqId}>
            <Badge
              variant={
                getCourseStatus(prereqId) === CourseStatus.ADDED
                  ? 'default'
                  : 'outline'
              }
            >
              {prerequisiteCourse.name}
            </Badge>
          </li>
        )
      })}
    </div>
  )
}
