import { courses } from '@/data/courses'
import { CourseCard } from './CourseCard'
import { useFlowsheet } from '../../hooks/useFlowsheet'
import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'

type SemesterProps = {
  id: number
  order: number
}

export function Semester({ id: semesterId, order }: SemesterProps) {
  const { courseMappings, selectSemester } = useFlowsheet()

  const semesterCourses: number[] = []

  courseMappings.forEach((value, key) => {
    if (value === semesterId) semesterCourses.push(key)
  })

  const totalCreditHours = semesterCourses.reduce(
    (acc, currentCourse) => {
      const course = courses[currentCourse]
      return acc + course.creditHours
    },
    0
  )

  return (
    <section className="flex flex-col gap-1 w-36">
      <div className="text-center">
        <header>Semester {order}</header>
        <p className="font-semibold text-muted-foreground text-sm">
          {totalCreditHours} Cr Hr
        </p>
      </div>
      <ul className="flex flex-col gap-1">
        {semesterCourses.map((id: number) => {
          const course = courses[id]
          if (!course) return null
          return (
            <li key={id} className="relative">
              <CourseCard
                id={id}
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
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
