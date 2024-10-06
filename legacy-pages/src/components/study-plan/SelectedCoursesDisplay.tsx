import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { courses } from '@/data/courses'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { DialogClose } from '../ui/dialog'

export function SelectedCoursesDisplay() {
  const {
    selectedCourses,
    handleSelectCourse,
    clearSelectedCourses,
    handleAddCourses,
  } = useStudyPlan()

  if (selectedCourses.length === 0) {
    return (
      <p className="text-muted-foreground my-auto text-center w-full">
        No courses selected.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm">{selectedCourses.length} Course(s) selected:</p>
        <div className="flex flex-wrap gap-1 max-h-32 overflow-auto">
          {selectedCourses.map((selectedId) => {
            const selectedCourse = courses[selectedId]

            return (
              <Badge
                key={selectedCourse.id}
                variant="secondary"
                onClick={() => handleSelectCourse(selectedId)}
                className="cursor-pointer hover:bg-red-400/50 h-6"
              >
                {selectedCourse.name}
              </Badge>
            )
          })}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={clearSelectedCourses}
            variant="outline"
            className="w-6/12 flex gap-1"
          >
            <X className="scale-75" />
            <p>Clear selection</p>
          </Button>
          <DialogClose asChild>
            <Button
              onClick={handleAddCourses}
              disabled={selectedCourses.length === 0}
              className="w-6/12 flex gap-1"
            >
              <Plus className="scale-75" />
              <p>Add courses</p>
            </Button>
          </DialogClose>
        </div>
      </div>
    </div>
  )
}
