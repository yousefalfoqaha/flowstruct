import { courses } from '@/data/courses'
import { Course } from './Course'
import { useSemesters } from '../hooks/useSemesters'
import { Button } from './ui/button'

type SemesterProps = {
  id: number
  courseIds: number[]
}

export function Semester({ id: semesterId, courseIds }: SemesterProps) {
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
      <Button variant="outline">Add course</Button>
    </section>
  )
}
