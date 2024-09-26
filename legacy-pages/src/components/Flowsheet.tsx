import { studyPlan } from '@/data/studyPlan'
import { useSemesters } from '../hooks/useSemesters'
import { Semester } from './Semester'

export function Flowsheet() {
  const { semesters } = useSemesters()

  return (
    <section className="flex flex-col justify-center">
      <header>{studyPlan.name} Flowsheet</header>
      <ul className="flex gap-1">
        {Object.values(semesters).map((semester) => {
          if (!semester) return null
          return (
            <li key={semester.id}>
              <Semester id={semester.id} courseIds={semester.courseIds} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
