import { studyPlan } from '@/data/studyPlan'
import { useSemesters } from '../../hooks/useSemesters'
import { Semester } from './Semester'
import { StudyPlan } from '../study-plan/StudyPlan'
import { CourseStatusesProvider } from '@/providers/CourseStatusesProvider'

export function Flowsheet() {
  const { semesters, selectedSemesterId } = useSemesters()

  return (
    <>
      <section className="flex flex-col justify-center">
        <header>{studyPlan.name} Flowsheet</header>
        <ul className="flex gap-1">
          {Object.values(semesters).map((semester) => {
            if (!semester) return null
            return (
              <li key={semester.id}>
                <Semester
                  id={semester.id}
                  order={semester.order}
                  courseIds={semester.courseIds}
                />
              </li>
            )
          })}
        </ul>
      </section>
      {selectedSemesterId && (
        <CourseStatusesProvider>
          <StudyPlan />
        </CourseStatusesProvider>
      )}
    </>
  )
}
