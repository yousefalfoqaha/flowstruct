import { Course } from "./courses"

export type Section = {
  id: number
  name: string
  requiredCreditHours: number
  courses: Course[]
}