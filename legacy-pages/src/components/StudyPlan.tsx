import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from './ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Section, sections } from '@/data/sections'
import { courses, Course } from '@/data/courses'
import { SectionCourse } from './SectionCourse'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useSemesters } from '@/hooks/useSemesters'
import { X } from 'lucide-react'
import { courseInSemester } from '@/lib/utils'

type StudyPlanProps = {
  semesterId: number
  onCloseStudyPlan: () => void
}

export function StudyPlan({ semesterId, onCloseStudyPlan }: StudyPlanProps) {
  const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([])
  const { semesters, addCourseToSemester } = useSemesters()

  const handleSelectCourse = (clickedCourse: Course) => {
    setSelectedCourses((prev) =>
      prev.includes(clickedCourse)
        ? prev.filter((course) => course.id !== clickedCourse.id)
        : [...prev, clickedCourse]
    )
  }
  return (
    <Dialog
      open={!!semesterId}
      onOpenChange={() => {
        onCloseStudyPlan()
        setSelectedCourses([])
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
          <Accordion type="single" collapsible className="mx-1">
            {Object.values(sections).map((section: Section) => {
              return (
                <AccordionItem value={`${section.id}`} className="border-none">
                  <AccordionTrigger className="font-normal hover:bg-zinc-50 transition-all rounded-xl px-3 hover:shadow-md">
                    <div className="flex flex-col text-left">
                      <p>{section.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {section.requiredCreditHours} Cr Hr Remaining
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col mt-2">
                      {section.courseIds.map((id) => {
                        const course = courses[id]
                        if (!course) return

                        let status = 'AVAILABLE'
                        if (selectedCourses.includes(course))
                          status = 'SELECTED'

                        const { inSemester } = courseInSemester(
                          course.id,
                          semesters
                        )
                        if (inSemester) status = 'ADDED'

                        course.prerequisiteIds.map((id) => {
                          const { inSemester, semester } = courseInSemester(
                            id,
                            semesters
                          )
                          if (
                            !inSemester ||
                            !semester ||
                            semester.order >= semesters[semesterId].order
                          ) {
                            status = 'DISABLED'
                            return
                          }
                        })
                        return (
                          <SectionCourse
                            code={course.code}
                            name={course.name}
                            creditHours={course.creditHours}
                            status={status}
                            onClick={() => handleSelectCourse(course)}
                          />
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        <DialogFooter className="mt-auto pt-2 border-t">
          <div className="flex flex-col gap-1 w-full">
            {selectedCourses.length !== 0 ? (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm">
                    {selectedCourses.length} Course(s) selected:
                  </p>
                  <div className=" flex flex-wrap gap-1 max-h-32 overflow-auto">
                    {selectedCourses.map((course) => {
                      return (
                        <Badge
                          variant="secondary"
                          onClick={() => handleSelectCourse(course)}
                          className="cursor-pointer hover:bg-red-400/50 h-6"
                        >
                          {course.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    onClick={() => setSelectedCourses([])}
                    variant="ghost"
                  >
                    <>
                      <X className="scale-75" />
                      <p>Clear selection</p>
                    </>
                  </Button>
                  <DialogClose asChild>
                    <Button
                      onClick={() =>
                        selectedCourses.map((course: Course) =>
                          addCourseToSemester(semesterId, course.id)
                        )
                      }
                      className=" mt-auto"
                    >
                      Add courses
                    </Button>
                  </DialogClose>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground my-auto text-center">
                  No courses selected.
                </p>
                <Button disabled>Add courses</Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
