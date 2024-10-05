import { Dialog, DialogContent, DialogHeader, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { courses } from '@/data/courses'
import { useSemesters } from '@/hooks/useSemesters'
import { DialogTitle, DialogDescription, DialogClose } from '../ui/dialog'
import { SelectedCoursesDisplay } from './SelectedCoursesDisplay'
import { useSelectedCourses } from '@/hooks/useSelectedCourses'
import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { CourseStatus } from '@/lib/constants'
import { sections, Section as SectionType } from '@/data/sections'
import { Accordion } from '../ui/accordion'
import Section from './Section'

export function StudyPlan() {
  const {
    addCourseToSelectedSemester,
    selectedSemester,
    clearSelectedSemester,
  } = useSemesters()

  const { getCourseStatus } = useCourseStatuses()

  const { selectedCourses, handleSelectCourse, clearSelectedCourses } =
    useSelectedCourses()

  const handleAddCourses = () => {
    selectedCourses.forEach((selectedId: number) => {
      if (getCourseStatus(selectedId) !== CourseStatus.AVAILABLE) {
        const unavailableCourse = courses[selectedId]
        return alert(`${unavailableCourse.name} is not available`)
      }

      addCourseToSelectedSemester(selectedSemester, selectedId)
    })
  }

  return (
    <Dialog
      open={!!selectedSemester}
      onOpenChange={() => {
        clearSelectedSemester()
        clearSelectedCourses()
      }}
    >
      <DialogContent className="h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Bachelor in Computer Science 2023/2024 Courses
          </DialogTitle>
          <DialogDescription>
            Browse sections to add courses to semester {selectedSemester}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto h-full">
          <Accordion type="single" collapsible className="mx-1">
            {Object.values(sections).map((section: SectionType) => {
              return (
                <Section
                  id={section.id}
                  name={section.name}
                  requiredCreditHours={section.requiredCreditHours}
                  courseIds={section.courseIds}
                  selectedCourses={selectedCourses}
                  onSelectCourse={handleSelectCourse}
                />
              )
            })}
          </Accordion>
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
              className="mt-auto"
            >
              Add courses
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
