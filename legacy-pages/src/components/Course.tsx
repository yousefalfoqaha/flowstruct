import { Plus, ArrowLeftFromLine, Trash } from 'lucide-react'
import { Button } from './ui/button'

type CourseProps = {
  code: string
  name: string
  creditHours: number
  status: string
  onClick: () => void
}

export function Course({
  code,
  name,
  creditHours,
  status,
  onClick,
}: CourseProps) {
  let height = 'h-full'
  let hoverColor = ''
  let icon = null

  switch (status) {
    case 'STUDY_PLAN':
      height = 'h-24'
      hoverColor = 'hover:bg-green-500/50'
      icon = <Plus className="scale-90" />
      break
    case 'PENDING':
      height = 'h-36'
      hoverColor = 'hover:bg-blue-300/50'
      icon = <ArrowLeftFromLine className="scale-90" />
      break
    case 'FLOWSHEET':
      height = 'h-36'
      hoverColor = 'hover:bg-red-500/50'
      icon = <Trash className="scale-90" />
      break
    default:
      height = 'h-full'
      hoverColor = ''
      icon = null
      break
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`group text-left flex flex-col p-3 bg-zinc-200 w-full ${height} rounded-md relative ${hoverColor}`} // apply hoverColor class here
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
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
        {icon}
      </div>
    </Button>
  )
}
