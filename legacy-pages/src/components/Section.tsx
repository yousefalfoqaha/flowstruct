import { courses } from '@/data/courses'
import { courseInSemester } from '@/lib/utils'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import { Course } from './Course'
import { usePendingCourses } from '../hooks/usePendingCourses'
import { useSemesters } from '../hooks/useSemesters'

type SectionProps = {
  id: number
  name: string
  requiredCreditHours: number
  courseIds: number[]
}

export function Section({
  id,
  name,
  requiredCreditHours,
  courseIds,
}: SectionProps) {
  const { semesters } = useSemesters() // abstract more to have section only worry about course status, not needing to see semesters
  const { pendingCourses, pendCourse } = usePendingCourses()
  return (
    <AccordionItem value={`item-${id}`} className="px-2">
      <AccordionTrigger>
        <section className="text-left">
          <p className="font-normal text-start pr-4">{name}</p>
          <p className="mt-1 font-semibold text-xs text-muted-foreground">
            {requiredCreditHours} Cr Hrs required
          </p>
        </section>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col gap-1">
          {courseIds.map((id: number) => {
            const course = courses[id]
            if (
              !course ||
              pendingCourses.includes(id) ||
              courseInSemester(id, semesters)
            )
              return null
            return (
              <li key={course.id} className="w-full">
                <Course
                  code={course.code}
                  name={course.name}
                  creditHours={course.creditHours}
                  status="STUDY_PLAN"
                  onClick={() => pendCourse(course.id)}
                />
              </li>
            )
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
