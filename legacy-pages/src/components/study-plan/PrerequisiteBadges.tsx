import { courses } from '@/data/courses'
import { Badge } from '../ui/badge'

type PrerequisiteBadges = {
  prerequisiteIds: number[]
  prerequisiteIdsNeeded: number[]
}

export default function PrerequisiteBadges({
  prerequisiteIds,
  prerequisiteIdsNeeded,
}: PrerequisiteBadges) {
  return (
    <div className="flex flex-wrap gap-1">
      {prerequisiteIds.map((id) => {
        const prerequisiteCourse = courses[id]

        return (
          <li key={id}>
            <Badge
              variant={
                prerequisiteIdsNeeded.includes(id) ? 'outline' : 'default'
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
