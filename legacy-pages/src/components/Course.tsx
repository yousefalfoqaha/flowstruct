import { Plus, Trash, Check, Info } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  status: string
  onClick?: () => void
}

export function Course({
  code,
  name,
  creditHours,
  status,
  onClick,
}: CourseProps) {
  if (status === 'STUDY_PLAN')
    return (
      <div className="group flex flex-row w-full p-3 border-b gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2">
            <p className="font-semibold my-auto border-r pr-2">{code}</p>
            <Badge variant="outline" className="w-fit">
              {creditHours} Cr Hr
            </Badge>
          </div>
          <p>{name}</p>
        </div>
        <div className="flex gap-1 transition-all ml-auto my-auto">
          <Button variant="ghost" className="my-auto w-13">
            <Info className="scale-75" />
          </Button>
          <Button onClick={onClick}>Add</Button>
        </div>
      </div>
    )

  if (status === 'FLOWSHEET')
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        className="group text-left flex flex-col p-3 w-full h-36 rounded-md relative"
      >
        <header className="w-full font-semibold">{code}</header>
        <p
          className={`w-full whitespace-normal font-normal text-sm overflow-hidden text-ellipsis line-clamp-3`}
        >
          {name}
        </p>
        <footer className="mt-auto ml-auto flex text-xs font-semibold text-muted-foreground">
          {creditHours} Cr Hr
        </footer>
        <div className="absolute top-2 right-2">
          {/* <div className="opacity-0 group-hover:opacity-100 transition-all">
          {icon}
        </div> */}
        </div>
      </Button>
    )
}
