import { SectionContext } from "@/contexts/SectionContext"
import { useContext } from "react"

export function useSection() {
  const context = useContext(SectionContext)

  if (!context) {
    throw new Error('SemestersContext must be used within a SemestersProvider')
  }

  return context
}
