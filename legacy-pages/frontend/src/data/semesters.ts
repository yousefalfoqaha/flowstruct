export type Semester = {
  id: number
  order: number
  courseIds: number[]
}

export const initialSemesters: { [key: number]: Semester } = {
  1: {
    id: 1,
    order: 1,
    courseIds: [],
  },
  2: {
    id: 2,
    order: 2,
    courseIds: [],
  },
  3: {
    id: 3,
    order: 3,
    courseIds: [],
  },
  4: {
    id: 4,
    order: 4,
    courseIds: [],
  },
  5: {
    id: 5,
    order: 5,
    courseIds: [],
  },
  6: {
    id: 6,
    order: 6,
    courseIds: [],
  },
}
