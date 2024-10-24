import { useFlowsheet } from '@/hooks/useFlowsheet'
import { Button } from '../ui/button'

type CourseProps = {
  id: number
  code: string
  name: string
  creditHours: number
}

export function CourseCard({
  id: courseId,
  code,
  name,
  creditHours,
}: CourseProps) {
  const { removePrerequisiteTree } = useFlowsheet()

  return (
    <Button
      variant="ghost"
      onClick={() => removePrerequisiteTree(courseId)}
      className="group text-left flex flex-col p-3 w-full h-36 rounded-md relative bg-zinc-200"
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
      <div className="absolute top-2 right-2"></div>
    </Button>
  )
}
