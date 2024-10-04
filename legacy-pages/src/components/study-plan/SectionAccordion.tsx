import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Section, sections } from '@/data/sections'
import { SectionCourse } from './SectionCourse'
import { courses, Course } from '@/data/courses'
import { useCourseStatuses } from '@/hooks/useCourseStatuses'
import { CourseStatus } from '@/lib/constants'

type SectionAccordionProps = {
  selectedCourses: Course[]
  onSelectCourse: (course: Course) => void
}

export function SectionAccordion({
  selectedCourses,
  onSelectCourse,
}: SectionAccordionProps) {
  const { getCourseStatus } = useCourseStatuses()

  return (
    <Accordion type="single" collapsible className="mx-1">
      {Object.values(sections).map((section: Section) => {
        const availableCoursesCount = section.courseIds.reduce(
          (count, id) =>
            getCourseStatus(id) === CourseStatus.AVAILABLE ? count + 1 : count,
          0
        )

        return (
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
                <p>{availableCoursesCount} courses available</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col mt-2">
                {section.courseIds.map((id) => {
                  const course = courses[id]
                  if (!course) return

                  const isSelected = selectedCourses.includes(course)

                  return (
                    <SectionCourse
                      key={course.id}
                      id={course.id}
                      code={course.code}
                      name={course.name}
                      creditHours={course.creditHours}
                      prerequisiteIds={course.prerequisiteIds}
                      isSelected={isSelected}
                      onClick={() => onSelectCourse(course)}
                    />
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
