import { CircleCheck, Info, Lock, Square, SquareCheck } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  status: string | undefined
  onClick?: () => void
}

export function SectionCourse({
  code,
  name,
  creditHours,
  status,
  onClick,
}: CourseProps) {
  let icon
  switch (status) {
    case 'SELECTED':
      icon = <SquareCheck />
      break
    case 'ADDED':
      icon = <CircleCheck />
      break
    case 'AVAILABLE':
      icon = <Square />
      break
    case 'DISABLED':
      icon = <Lock />
      break
    default:
  }
  return (
    <div className="group flex gap-2 py-3 border-b">
      {status === 'ADDED' || status === 'DISABLED' ? (
        <div className="p-2 my-auto">{icon}</div>
      ) : (
        <Button variant="ghost" onClick={onClick} className="p-2 my-auto">
          {icon}
        </Button>
      )}
      <div className="flex flex-col gap-1 w-full pl-1 my-auto">
        <div className="flex">
          <p className="font-semibold my-auto">{code}</p>
          <Badge variant="outline" className="ml-2">
            {creditHours} Cr Hr
          </Badge>
        </div>
        <p>{name}</p>
      </div>
      <Button variant="ghost" className="my-auto scale-75 h-12">
        <Info />
      </Button>
    </div>
  )
}
