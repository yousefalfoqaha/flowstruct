import { courses } from '@/data/courses'
import { sections } from '@/data/sections'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  DialogTitle,
} from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Course } from './Course'
import { useSemesters } from '../hooks/useSemesters'
import { Button } from './ui/button'
import { useState } from 'react'

type StudyPlanProps = {
  semesterId: number
  onCloseStudyPlan: () => void
}

export function StudyPlan({ semesterId, onCloseStudyPlan }: StudyPlanProps) {
  const { addCourseToSemester } = useSemesters()
  const [pendingCourseIds, setPendingCourseIds] = useState<number[]>([])

  const handlePendCourse = (courseId: number) => {
    setPendingCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    )
  }
  console.log('Rendering sp')
  return (
    <Dialog
      open={!!semesterId}
      onOpenChange={() => {
        setPendingCourseIds([])
        onCloseStudyPlan()
      }}
    >
      <DialogContent className="flex flex-col max-w-[60rem] min-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Computer Science 2023/2024 Courses</DialogTitle>
        </DialogHeader>
        <div className="flex gap-6 h-[30rem]">
          <section className="border rounded-lg w-full flex">
            <ScrollArea>
              <div className="flex flex-col border-r">
                <h2 className="text-center py-2 font-semibold">Sections</h2>
                {Object.values(sections).map((section) => {
                  return (
                    <Button
                      variant="ghost"
                      className="font-normal h-full whitespace-normal rounded-none"
                    >
                      <div className="flex flex-col gap-1">
                        <h2>{section.name}</h2>
                        <p className="text-muted-foreground">
                          {section.requiredCreditHours} Cr Hr required
                        </p>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
            <section className="flex flex-col w-full">
              <h2 className="text-center p-2 font-semibold">All Courses</h2>
              <ScrollArea>
                <div className="flex flex-col gap-1 px-2">
                  {Object.values(courses).map((course) => {
                    if (!course) return
                    return (
                      <Course
                        code={course.code}
                        name={course.name}
                        creditHours={course.creditHours}
                        status="STUDY_PLAN"
                        onClick={() => handlePendCourse(course.id)}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            </section>
          </section>
          <section className="flex flex-col border rounded-lg">
            <h2 className="text-center p-2 font-semibold">Selected</h2>
            <ScrollArea>
              <div className="flex flex-col w-40 px-2 gap-1">
                {pendingCourseIds.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center">
                    No courses
                    <br />
                    selected
                  </p>
                ) : (
                  pendingCourseIds.map((id: number) => {
                    const course = courses[id]
                    return (
                      <Course
                        key={course.id}
                        code={course.code}
                        name={course.name}
                        creditHours={course.creditHours}
                        status="PENDING"
                        onClick={() => handlePendCourse(course.id)}
                      />
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </section>
        </div>
        <DialogFooter className="w-full flex-row">
          <Button
            onClick={() => setPendingCourseIds([])}
            variant="outline"
            className="mr-auto"
          >
            Clear selection
          </Button>
          <DialogClose asChild>
            {pendingCourseIds.length === 0 ? (
              <Button disabled className="ml-auto w-40">
                Add 0 courses
              </Button>
            ) : (
              <Button
                onClick={() =>
                  pendingCourseIds.forEach((courseId: number) =>
                    addCourseToSemester(semesterId, courseId)
                  )
                }
                className="ml-auto w-40"
              >
                Add {pendingCourseIds.length} courses
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
