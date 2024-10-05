import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Section, sections } from '@/data/sections'
import { SectionCourse } from './SectionCourse'
import { courses, Course } from '@/data/courses'
import AvailableCoursesIndicator from './AvailableCoursesIndicator'

type SectionAccordionProps = {
  selectedCourses: Course[]
  onSelectCourse: (course: Course) => void
}

export function SectionAccordion({
  selectedCourses,
  onSelectCourse,
}: SectionAccordionProps) {
  return (
    <Accordion type="single" collapsible className="mx-1">
      {Object.values(sections).map((section: Section) => {
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
                <AvailableCoursesIndicator courseIds={section.courseIds} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col mt-2">
                {section.courseIds.length !== 0 ? (
                  section.courseIds.map((id) => {
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
      })}
    </Accordion>
  )
}
