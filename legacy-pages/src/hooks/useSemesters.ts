import { SemestersContext } from "@/contexts/SemestersContext"
import { useContext } from "react"

export function useSemesters() {
  const context = useContext(SemestersContext)

  if (!context) {
    throw new Error('SemestersContext must be used within a SemestersProvider')
  }

  return context
}
