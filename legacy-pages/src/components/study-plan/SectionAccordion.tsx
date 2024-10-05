import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Section, sections } from '@/data/sections'
import { SectionCourse } from './SectionCourse'
import { courses } from '@/data/courses'
import SectionCreditHoursRequirement from './SectionCreditHoursRequirement'

type SectionAccordionProps = {
  selectedCourses: number[]
  onSelectCourse: (clickedCourseId: number) => void
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
            <AccordionTrigger className="group font-normal hover:bg-zinc-50 transition-all rounded-xl px-3 hover:shadow-md">
              <div className="flex flex-col w-full gap-1">
                <div className="flex gap-2">
                  <p className="mx-auto">{section.name}</p>
                </div>
                <SectionCreditHoursRequirement
                  requiredCreditHours={section.requiredCreditHours}
                  courseIds={section.courseIds}
                  selectedCourses={selectedCourses}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col mt-2">
                {section.courseIds.length !== 0 ? (
                  section.courseIds.map((id) => {
                    const course = courses[id]
                    if (!course) return

                    const isSelected = selectedCourses.includes(id)

                    return (
                      <SectionCourse
                        key={course.id}
                        id={course.id}
                        code={course.code}
                        name={course.name}
                        creditHours={course.creditHours}
                        prerequisiteIds={course.prerequisiteIds}
                        isSelected={isSelected}
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
      })}
    </Accordion>
  )
}
