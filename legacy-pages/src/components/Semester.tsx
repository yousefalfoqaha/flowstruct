import { courses } from '@/data/courses'
import { Course } from './Course'
import { useSemesters } from '../hooks/useSemesters'
import { PendingCoursesProvider } from '@/providers/PendingCoursesProvider'
import { Button } from './ui/button'

type SemesterProps = {
  id: number
  courseIds: number[]
  onOpenStudyPlan: () => void
}

export function Semester({
  id: semesterId,
  courseIds,
  onOpenStudyPlan,
}: SemesterProps) {
  const { removeCourseFromSemester } = useSemesters()
  return (
    <section className="flex flex-col gap-1 w-36">
      <header className="text-center">Semester {semesterId}</header>
      <ul className="flex flex-col gap-1">
        {courseIds.map((id) => {
          const course = courses[id]
          if (!course) return null
          return (
            <li key={id} className="relative">
              <Course
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
                status="FLOWSHEET"
                onClick={() => removeCourseFromSemester(semesterId, course.id)}
              />
            </li>
          )
        })}
      </ul>
      <PendingCoursesProvider>
        <Button onClick={onOpenStudyPlan}>Add course</Button>
      </PendingCoursesProvider>
    </section>
  )
}
