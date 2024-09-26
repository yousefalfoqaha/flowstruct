export type Section = {
  id: number
  name: string
  requiredCreditHours: number
  courseIds: number[]
}

export const sections: { [key: number]: Section } = {
  0: {
    id: 0,
    name: 'Remedial Courses',
    requiredCreditHours: 0,
    courseIds: [],
  },
  1: {
    id: 1,
    name: 'University Requirements',
    requiredCreditHours: 16,
    courseIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  2: {
    id: 2,
    name: 'University Electives',
    requiredCreditHours: 6,
    courseIds: [10],
  },
  3: {
    id: 3,
    name: 'School Requirements',
    requiredCreditHours: 21,
    courseIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  },
  4: {
    id: 4,
    name: 'Program Requirements',
    requiredCreditHours: 86,
    courseIds: [
      23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45,
    ],
  },
  5: {
    id: 5,
    name: 'Special Program Requirements (General Track)',
    requiredCreditHours: 12,
    courseIds: [46, 47, 48, 49],
  },
  6: {
    id: 6,
    name: 'Program  Electives',
    requiredCreditHours: 12,
    courseIds: [],
  },
}
