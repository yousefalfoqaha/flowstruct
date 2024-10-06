import { courses } from '@/data/courses'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { SectionCourse } from './SectionCourse'
import { CourseStatus } from '@/lib/constants'
import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { Dot } from 'lucide-react'
import { Progress } from '../ui/progress'

type SectionProps = {
  id: number
  name: string
  requiredCreditHours: number
  courseIds: number[]
  selectedCourses: number[]
  onSelectCourse: (clickedCourseId: number) => void
}

export default function Section({
  id,
  name,
  requiredCreditHours,
  courseIds,
  selectedCourses,
  onSelectCourse,
}: SectionProps) {
  const { getCourseStatus } = useCourseStatuses()

  const addedCreditHours = courseIds.reduce((count, currentCourse) => {
    if (
      getCourseStatus(currentCourse) === CourseStatus.ADDED ||
      selectedCourses.includes(currentCourse)
    ) {
      const addedCourseCreditHours = courses[currentCourse].creditHours
      return count + addedCourseCreditHours
    }
    return count
  }, 0)

  const remainingCreditHours = requiredCreditHours - addedCreditHours
  const sectionIsComplete = remainingCreditHours === 0

  const availableCoursesCount = courseIds.reduce(
    (count, id) =>
      getCourseStatus(id) === CourseStatus.AVAILABLE &&
      !selectedCourses.includes(id) &&
      !sectionIsComplete
        ? count + 1
        : count,
    0
  )
  return (
    <AccordionItem key={id} value={`${id}`} className="border-none">
      <AccordionTrigger className="group font-normal hover:bg-zinc-50 transition-all rounded-xl px-3 hover:shadow-md">
        <div className="flex flex-col w-full gap-1">
          <div className="flex gap-2">
            <p className="mx-auto font-semibold">{name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex mx-auto">
              <p className="text-sm text-muted-foreground text-left my-auto">
                {sectionIsComplete
                  ? 'Completed'
                  : `${remainingCreditHours} Cr Hrs Remaining`}
              </p>
              {availableCoursesCount !== 0 ? (
                <div className="flex">
                  <Dot className="text-green-500" />
                  <p className="text-sm my-auto text-muted-foreground">
                    {availableCoursesCount} Available
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
            <Progress
              className="h-2 my-auto"
              value={(addedCreditHours / requiredCreditHours) * 100}
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col mt-2">
          {courseIds.length !== 0 ? (
            courseIds.map((id) => {
              const course = courses[id]
              if (!course) return

              return (
                <SectionCourse
                  key={course.id}
                  id={course.id}
                  code={course.code}
                  name={course.name}
                  creditHours={course.creditHours}
                  prerequisiteIds={course.prerequisiteIds}
                  isSelected={selectedCourses.includes(id)}
                  sectionIsComplete={sectionIsComplete}
                  onClick={() => onSelectCourse(id)}
                />
              )
            })
          ) : (
            <p className="py-3 text-center text-muted-foreground">
              No courses found
            </p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
