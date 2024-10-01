import { CircleCheck, Info, Lock, Square, SquareCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CourseStatus } from '@/lib/constants'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  status: CourseStatus
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
  status,
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
      <div className="flex flex-col gap-1 w-full pl-1 my-auto">
        <div className="flex items-center">
          <p className="font-semibold">{code}</p>
          <Badge variant="outline" className="ml-2">
            {creditHours} Cr Hr
          </Badge>
        </div>
        <p>{name}</p>
      </div>
      <Button
        variant="ghost"
        className="my-auto scale-75 h-12"
        aria-label={`More information about ${code}`}
      >
        <Info className="h-5 w-5" />
      </Button>
    </div>
  )
}
