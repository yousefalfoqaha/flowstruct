export type Semester = {
  id: number
  courseIds: number[]
}

export const initialSemesters: { [key: number]: Semester } = {
  1: {
    id: 1,
    courseIds: [],
  },
  2: {
    id: 2,
    courseIds: [],
  },
  3: {
    id: 3,
    courseIds: [],
  },
}
