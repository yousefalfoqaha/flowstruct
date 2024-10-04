import { useState } from 'react'
import { Course } from '@/data/courses'

export function useSelectedCourses() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])

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
