import { Course } from '@/data/courses'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { SectionCourse } from './SectionCourse'
import { Dot } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useSection } from '@/hooks/useSection'

type SectionProps = {
  id: number
  name: string
  requiredCreditHours: number
  courses: Course[]
}

export default function Section({
  id,
  name,
  requiredCreditHours,
  courses,
}: SectionProps) {
  const { availableCoursesCount, addedCreditHours, remainingCreditHours } =
    useSection()

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
                {remainingCreditHours === 0
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
          {courses.length !== 0 ? (
            courses.map((course: Course) => {
              if (!course) return

              return (
                <SectionCourse
                  key={course.id}
                  id={course.id}
                  code={course.code}
                  name={course.name}
                  creditHours={course.creditHours}
                  prerequisiteIds={course.prerequisiteIds}
                  sectionIsComplete={remainingCreditHours === 0}
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
