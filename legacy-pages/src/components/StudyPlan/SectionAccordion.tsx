import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Section, sections } from '@/data/sections'
import { SectionCourse } from './SectionCourse'
import { courses, Course } from '@/data/courses'
import { getCourseStatus } from '@/lib/utils'
import { useSemesters } from '@/hooks/useSemesters'

type SectionAccordionProps = {
  selectedSemesterId: number
  selectedCourses: Course[]
  onSelectCourse: (course: Course) => void
}

export function SectionAccordion({
  selectedSemesterId,
  selectedCourses,
  onSelectCourse,
}: SectionAccordionProps) {
  const { semesters } = useSemesters()

  return (
    <Accordion type="single" collapsible className="mx-1">
      {Object.values(sections).map((section: Section) => (
        <AccordionItem
          key={section.id}
          value={`${section.id}`}
          className="border-none"
        >
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
                if (!course) return null

                const status = getCourseStatus(
                  course,
                  selectedCourses,
                  semesters,
                  selectedSemesterId
                )

                return (
                  <SectionCourse
                    key={course.id}
                    code={course.code}
                    name={course.name}
                    creditHours={course.creditHours}
                    status={status}
                    onClick={() => onSelectCourse(course)}
                  />
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
