import { Dialog, DialogContent, DialogHeader, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Course } from '@/data/courses'
import { useSemesters } from '@/hooks/useSemesters'
import { DialogTitle, DialogDescription, DialogClose } from '../ui/dialog'
import { SectionAccordion } from './SectionAccordion'
import { SelectedCoursesDisplay } from './SelectedCoursesDisplay'
import { useSelectedCourses } from '@/hooks/useSelectedCourses'

type StudyPlanProps = {
  selectedSemesterId: number
  onCloseStudyPlan: () => void
}

export function StudyPlan({
  selectedSemesterId,
  onCloseStudyPlan,
}: StudyPlanProps) {
  const { addCourseToSemester } = useSemesters()
  const { selectedCourses, handleSelectCourse, clearSelectedCourses } =
    useSelectedCourses()

  const handleAddCourses = () => {
    selectedCourses.forEach((course: Course) =>
      addCourseToSemester(selectedSemesterId, course.id)
    )
  }

  return (
    <Dialog
      open={!!selectedSemesterId}
      onOpenChange={() => {
        onCloseStudyPlan()
        clearSelectedCourses()
      }}
    >
      <DialogContent className="h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Bachelor in Computer Science 2023/2024 Courses
          </DialogTitle>
          <DialogDescription>
            Browse sections to add courses to the semester
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto h-full">
          <SectionAccordion
            selectedSemesterId={selectedSemesterId}
            selectedCourses={selectedCourses}
            onSelectCourse={handleSelectCourse}
          />
        </div>
        <DialogFooter className="flex flex-col gap-1 pt-4 border-t">
          <SelectedCoursesDisplay
            selectedCourses={selectedCourses}
            onClearSelection={clearSelectedCourses}
            onSelectCourse={handleSelectCourse}
          />
          <DialogClose asChild>
            <Button
              onClick={handleAddCourses}
              disabled={selectedCourses.length === 0}
              className='mt-auto'
            >
              Add courses
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
