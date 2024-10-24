import { FlowsheetContext } from '@/contexts/FlowsheetContext'
import { useContext } from 'react'

export function useFlowsheet() {
  const context = useContext(FlowsheetContext)

  if (!context) {
    throw new Error('SemestersContext must be used within a SemestersProvider')
  }

  return context
}
