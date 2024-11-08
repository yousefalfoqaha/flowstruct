import { Course } from '@/data/courses'
import { createContext } from 'react'

interface SectionContextType {
  availableCourses: Course[]
  addedCreditHours: number
  remainingCreditHours: number
}

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined
)
