import { Dialog, DialogContent, DialogHeader, DialogFooter } from '../ui/dialog'
import { DialogTitle, DialogDescription } from '../ui/dialog'
import { SelectedCoursesDisplay } from './SelectedCoursesDisplay'
import { Section as SectionType } from '@/data/sections'
import { Accordion } from '../ui/accordion'
import Section from './Section'
import SectionProvider from '@/providers/SectionProvider'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useFlowsheet } from '@/hooks/useFlowsheet'
import { useQuery } from '@tanstack/react-query'

export function StudyPlan() {
  const { closeDialog } = useStudyPlan()
  const { selectedSemester } = useFlowsheet()
  const { data: studyPlan } = useQuery({
    queryKey: ['studyplan'],
    queryFn: () =>
      fetch('http://localhost:8080/studyplan/1').then((res) => res.json()),
  })

  return (
    <Dialog open={selectedSemester !== null} onOpenChange={closeDialog}>
      <DialogContent className="h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Bachelor in Computer Science 2023/2024 Courses
          </DialogTitle>
          <DialogDescription>
            Browse sections to add courses to flowsheet
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto h-full">
          <Accordion type="single" collapsible className="mx-1">
            {studyPlan.sections.map((section: any) => {
              return (
                <SectionProvider sectionId={section.id}>
                  <Section
                    id={section.id}
                    name={section.name}
                    requiredCreditHours={section.requiredCreditHours}
                    courses={section.courses}
                  />
                </SectionProvider>
              )
            })}
          </Accordion>
        </div>
        <DialogFooter className="flex flex-col gap-1 pt-4 border-t">
          <SelectedCoursesDisplay />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
