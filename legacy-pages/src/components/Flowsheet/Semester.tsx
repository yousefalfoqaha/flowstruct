import { courses } from '@/data/courses'
import { CourseCard } from './CourseCard'
import { useSemesters } from '../../hooks/useSemesters'
import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'
import { recursiveRemove } from '@/lib/utils'

type SemesterProps = {
  id: number
  order: number
  courseIds: number[]
  onOpenStudyPlan: () => void
}

export function Semester({
  id: semesterId,
  order,
  courseIds,
  onOpenStudyPlan,
}: SemesterProps) {
  const { semesters, removeCourseFromSemester } = useSemesters()

  return (
    <section className="flex flex-col gap-1 w-36">
      <header className="text-center">Semester {order}</header>
      <ul className="flex flex-col gap-1">
        {courseIds.map((id: number) => {
          const course = courses[id]
          if (!course) return null
          return (
            <li key={id} className="relative">
              <CourseCard
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
                onClick={() => recursiveRemove(semesterId, course.id, semesters, removeCourseFromSemester)}
              />
            </li>
          )
        })}
      </ul>
      <Button variant="ghost" onClick={onOpenStudyPlan} className="flex gap-1">
        <CirclePlus className="scale-75" />
        <p>Add course</p>
      </Button>
    </section>
  )
}
