import { useState } from 'react'

export function useSelectedCourses() {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])

  const handleSelectCourse = (clickedCourseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(clickedCourseId)
        ? prev.filter((courseId) => courseId !== clickedCourseId)
        : [...prev, clickedCourseId]
    )
  }

  const clearSelectedCourses = () => setSelectedCourses([])

  return { selectedCourses, handleSelectCourse, clearSelectedCourses }
}
