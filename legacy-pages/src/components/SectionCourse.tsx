import { CircleHelp, Square, SquareCheck } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  pending: boolean | undefined
  onClick?: () => void
}

export function SectionCourse({
  code,
  name,
  creditHours,
  pending,
  onClick,
}: CourseProps) {
  let icon = <Square />
  if (pending) icon = <SquareCheck />
  return (
    <div className="group flex gap-2 py-3 border-b">
      <Button variant="ghost" onClick={onClick} className="p-2 my-auto">
        {icon}
      </Button>
      <div className="flex flex-col gap-1 w-full pl-1 my-auto">
        <div className="flex">
          <p className="font-semibold pr-2 border-r">{code}</p>
          <Badge variant='outline' className='ml-2'>{creditHours} Cr Hr</Badge>
        </div>
        <p>{name}</p>
      </div>
          <Button variant='ghost' className='my-auto scale-75 h-12'>
            <CircleHelp />
          </Button>
    </div>
  )
}
