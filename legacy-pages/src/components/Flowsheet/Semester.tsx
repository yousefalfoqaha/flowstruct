import { courses } from '@/data/courses'
import { CourseCard } from './CourseCard'
import { useSemesters } from '../../hooks/useSemesters'
import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'

type SemesterProps = {
  id: number
  order: number
  courseIds: number[]
}

export function Semester({ id: semesterId, order, courseIds }: SemesterProps) {
  const { semesters, selectSemester, removePrerequisiteTree } = useSemesters()

  const semester = semesters[semesterId]
  const totalCreditHours = semester.courseIds.reduce((acc, currentCourse) => {
    const course = courses[currentCourse]
    return acc + course.creditHours
  }, 0)

  return (
    <section className="flex flex-col gap-1 w-36">
      <div className="text-center">
        <header>Semester {order}</header>
        <p className="font-semibold text-muted-foreground text-sm">
          {totalCreditHours} Cr Hr
        </p>
      </div>
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
                onClick={() => removePrerequisiteTree(course.id)}
              />
            </li>
          )
        })}
      </ul>
      <Button
        variant="ghost"
        onClick={() => selectSemester(semesterId)}
        className="flex gap-1"
      >
        <CirclePlus className="scale-75" />
        <p>Add course</p>
      </Button>
    </section>
  )
}
