import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Course } from '@/data/courses'

type SelectedCoursesDisplayProps = {
  selectedCourses: Course[]
  onClearSelection: () => void
  onSelectCourse: (course: Course) => void
}

export function SelectedCoursesDisplay({
  selectedCourses,
  onClearSelection,
  onSelectCourse,
}: SelectedCoursesDisplayProps) {
  if (selectedCourses.length === 0) {
    return (
        <p className="text-muted-foreground my-auto text-center">
          No courses selected.
        </p>
    )
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm">{selectedCourses.length} Course(s) selected:</p>
        <div className="flex flex-wrap gap-1 max-h-32 overflow-auto">
          {selectedCourses.map((course) => (
            <Badge
              key={course.id}
              variant="secondary"
              onClick={() => onSelectCourse(course)}
              className="cursor-pointer hover:bg-red-400/50 h-6"
            >
              {course.name}
            </Badge>
          ))}
        </div>
      </div>
      <Button onClick={onClearSelection} variant="ghost">
        <X className="scale-75" />
        <p>Clear selection</p>
      </Button>
    </div>
  )
}
