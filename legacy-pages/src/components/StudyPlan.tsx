import { courses } from '@/data/courses'
import { sections } from '@/data/sections'
import { Accordion } from './ui/accordion'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Section } from './Section'
import { Course } from './Course'
import { usePendingCourses } from '../hooks/usePendingCourses'
import { useSemesters } from '../hooks/useSemesters'
import { Button } from './ui/button'

type StudyPlanProps = {
  semesterId: number
  onClose: () => void
}

export function StudyPlan({ semesterId, onClose }: StudyPlanProps) {
  const { addCourseToSemester } = useSemesters()
  const { pendingCourses, clearPendingCourses, unpendCourse } =
    usePendingCourses()

  console.log('Rendering full study plan')
  return (
    <Dialog
      open={!!semesterId}
      onOpenChange={() => {
        clearPendingCourses()
        onClose()
      }}
    >
      <DialogContent className="max-w-[60rem] max-h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle>Study Plan Courses</DialogTitle>
          <DialogDescription>
            Add available courses to semester {semesterId}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 w-full">
          <ScrollArea className="border rounded-lg h-[30rem] p-1 w-full">
            <Accordion type="single" collapsible>
              {Object.values(sections).map((section) => {
                return (
                  <Section
                    key={section.id}
                    id={section.id}
                    name={section.name}
                    requiredCreditHours={section.requiredCreditHours}
                    courseIds={section.courseIds}
                  />
                )
              })}
            </Accordion>
          </ScrollArea>
          <section>
            <div className="flex flex-col p-2 gap-1 border rounded-lg h-full w-40">
              {pendingCourses.length === 0 ? (
                <p className="text-muted-foreground text-sm m-auto text-center">
                  No courses
                  <br />
                  selected
                </p>
              ) : (
                pendingCourses.map((id: number) => {
                  const course = courses[id]
                  return (
                    <Course
                      key={course.id}
                      code={course.code}
                      name={course.name}
                      creditHours={course.creditHours}
                      status="PENDING"
                      onClick={() => unpendCourse(course.id)}
                    />
                  )
                })
              )}
            </div>
          </section>
        </div>
        <DialogFooter className="w-full flex flex-row">
          <Button
            onClick={clearPendingCourses}
            variant="outline"
            className="mr-auto"
          >
            Clear selection
          </Button>
          <DialogClose asChild>
            {pendingCourses.length === 0 ? (
              <Button disabled className="ml-auto w-40">
                Add 0 courses
              </Button>
            ) : (
              <Button
                onClick={() =>
                  pendingCourses.forEach((courseId: number) =>
                    addCourseToSemester(semesterId, courseId)
                  )
                }
                className="ml-auto w-40"
              >
                Add {pendingCourses.length} courses
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
