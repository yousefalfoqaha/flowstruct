import { useState } from 'react'
import { Course, courses } from '@/data/courses'

export function useSelectedCourses() {
  const testCourse = courses[42]
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([testCourse])

  const handleSelectCourse = (clickedCourse: Course) => {
    setSelectedCourses((prev) =>
      prev.includes(clickedCourse)
        ? prev.filter((course) => course.id !== clickedCourse.id)
        : [...prev, clickedCourse]
    )
  }

  const clearSelectedCourses = () => setSelectedCourses([])

  return { selectedCourses, handleSelectCourse, clearSelectedCourses }
}
