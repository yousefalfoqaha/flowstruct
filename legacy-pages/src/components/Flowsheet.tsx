import { studyPlan } from '@/data/studyPlan'
import { useSemesters } from '../hooks/useSemesters'
import { Semester } from './Semester'
import { useState } from 'react'
import { StudyPlan } from './StudyPlan'
import { PendingCoursesProvider } from '@/providers/PendingCoursesProvider'

export function Flowsheet() {
  const { semesters } = useSemesters()
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(
    null
  )

  return (
    <PendingCoursesProvider>
      <section className="flex flex-col justify-center">
        <header>{studyPlan.name} Flowsheet</header>
        <ul className="flex gap-1">
          {Object.values(semesters).map((semester) => {
            if (!semester) return null
            return (
              <li key={semester.id}>
                <Semester
                  id={semester.id}
                  courseIds={semester.courseIds}
                  onOpenStudyPlan={() => setSelectedSemesterId(semester.id)}
                />
              </li>
            )
          })}
        </ul>
      </section>
      {selectedSemesterId && (
        <StudyPlan
          semesterId={selectedSemesterId}
          onClose={() => setSelectedSemesterId(null)}
        />
      )}
    </PendingCoursesProvider>
  )
}
