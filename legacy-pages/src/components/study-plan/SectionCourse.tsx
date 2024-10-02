import { CircleCheck, Info, Lock, Square, SquareCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { CourseStatus } from '@/lib/constants'
import PrerequisiteBadges from './PrerequisiteBadges'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  prerequisiteIds: number[]
  status: CourseStatus
  prerequisiteIdsNeeded: number[]
  onClick?: () => void
}

const STATUS_ICONS = {
  [CourseStatus.SELECTED]: SquareCheck,
  [CourseStatus.ADDED]: CircleCheck,
  [CourseStatus.AVAILABLE]: Square,
  [CourseStatus.DISABLED]: Lock,
}

export function SectionCourse({
  code,
  name,
  creditHours,
  prerequisiteIds,
  status,
  prerequisiteIdsNeeded,
  onClick = () => {},
}: CourseProps) {
  const IconComponent = STATUS_ICONS[status] || Square

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
      <div className="flex flex-col gap-3 w-full pl-1">
        <div className="flex my-auto">
          <p className="font-semibold pr-2 border-r">{code}</p>
          <p className="ml-2">{name}</p>
        </div>
        <PrerequisiteBadges
          prerequisiteIds={prerequisiteIds}
          prerequisiteIdsNeeded={prerequisiteIdsNeeded}
        />
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
