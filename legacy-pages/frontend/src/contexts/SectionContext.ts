import { createContext } from 'react'

interface SectionContextType {
  availableCoursesCount: number
  addedCreditHours: number
  remainingCreditHours: number
}

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined
)
