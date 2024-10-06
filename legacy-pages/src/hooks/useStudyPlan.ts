import { StudyPlanContext } from '@/contexts/StudyPlanContext'
import { useContext } from 'react'

export function useStudyPlan() {
  const context = useContext(StudyPlanContext)

  if (!context) {
    throw new Error('StudyPlanContext must be used within a StudyPlanProvider')
  }

  return context
}
