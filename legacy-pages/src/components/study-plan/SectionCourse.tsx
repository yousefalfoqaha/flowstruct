import { CircleCheck, Info, Lock, Square, SquareCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { CourseStatus } from '@/lib/constants'
import PrerequisiteBadges from './PrerequisiteBadges'
import { useCourseStatuses } from '@/hooks/useCourseStatuses'

type CourseProps = {
  id: number
  code: string
  name: string
  creditHours: number
  prerequisiteIds: number[]
  isSelected: boolean
  onClick?: () => void
}

const STATUS_ICONS = {
  [CourseStatus.ADDED]: CircleCheck,
  [CourseStatus.AVAILABLE]: Square,
  [CourseStatus.DISABLED]: Lock,
}
export function SectionCourse({
  id: courseId,
  code,
  name,
  creditHours,
  prerequisiteIds,
  isSelected,
  onClick = () => {},
}: CourseProps) {
  const status = useCourseStatuses().getCourseStatus(courseId)
  const IconComponent = isSelected ? SquareCheck : STATUS_ICONS[status]

  return (
    <div className="group flex gap-2 py-3 border-b">
      <Button
        variant="ghost"
        onClick={onClick}
        className="p-2 my-auto"
        disabled={
          status === CourseStatus.ADDED || status === CourseStatus.DISABLED
        }
        aria-label={`Select course ${code}`}
      >
        <IconComponent className="scale-90" />
      </Button>
      <div className="flex flex-col gap-2 w-full pl-1">
        <div className="flex gap-2">
          <p className="font-semibold pr-2 border-r my-auto">{code}</p>
          <p className='text-center'>{name}</p>
          <p className="whitespace-nowrap my-auto pl-2 border-l">
            {creditHours} Cr Hr
          </p>
        </div>
        {prerequisiteIds.length !== 0 ? (
          <ul>
            <PrerequisiteBadges prerequisiteIds={prerequisiteIds} />
          </ul>
        ) : (
          <p className="text-muted-foreground">No pre-requisites</p>
        )}
      </div>
      <Button
        variant="ghost"
        className="my-auto scale-75 h-12"
        aria-label={`More information about ${code}`}
      >
        <Info className="scale-90" />
      </Button>
    </div>
  )
}
