export type Course = {
  id: number
  code: string
  name: string
  creditHours: number
  prerequisiteIds: number[]
  corequisiteIds: number[]
}

export const courses: { [key: number]: Course } = {
  1: {
    id: 1,
    code: 'ARB100',
    name: 'Arabic',
    creditHours: 3,
    prerequisiteIds: [52], // ARB0099
    corequisiteIds: [],
  },
  2: {
    id: 2,
    code: 'ENGL1001',
    name: 'Upper-Intermediate English',
    creditHours: 3,
    prerequisiteIds: [50], // ENGL0099
    corequisiteIds: [],
  },
  3: {
    id: 3,
    code: 'ENGL1002',
    name: 'Advanced English',
    creditHours: 3,
    prerequisiteIds: [2], // ENGL1001
    corequisiteIds: [],
  },
  4: {
    id: 4,
    code: 'GERL101B1',
    name: 'German I B1-Track',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [],
  },
  5: {
    id: 5,
    code: 'GERL102B1',
    name: 'German II B1-Track',
    creditHours: 3,
    prerequisiteIds: [4], // GERL101B1
    corequisiteIds: [],
  },
  6: {
    id: 6,
    code: 'GERL102B2',
    name: 'German II B2-Track',
    creditHours: 3,
    prerequisiteIds: [4], // GERL101B1
    corequisiteIds: [],
  },
  7: {
    id: 7,
    code: 'MILS100',
    name: 'Military Science',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [],
  },
  8: {
    id: 8,
    code: 'NE101',
    name: 'National Education',
    creditHours: 3,
    prerequisiteIds: [52, 50], // ARB0099, ENGL0099
    corequisiteIds: [],
  },
  9: {
    id: 9,
    code: 'NEE101',
    name: 'National Education in English',
    creditHours: 3,
    prerequisiteIds: [52, 50], // ARB0099, ENGL0099
    corequisiteIds: [],
  },
  10: {
    id: 10,
    code: 'GERL201B1',
    name: 'German III B1-Track',
    creditHours: 3,
    prerequisiteIds: [5, 6], // GERL102B1 or GERL102B2
    corequisiteIds: [],
  },
  11: {
    id: 11,
    code: 'GERL201B2',
    name: 'German III B2-Track',
    creditHours: 3,
    prerequisiteIds: [5, 6], // GERL102B1 or GERL102B2
    corequisiteIds: [],
  },
  12: {
    id: 12,
    code: 'GERL202B1',
    name: 'German IV B1-Track',
    creditHours: 3,
    prerequisiteIds: [10, 11], // GERL201B1 or GERL201B2
    corequisiteIds: [],
  },
  13: {
    id: 13,
    code: 'GERL202B2',
    name: 'German IV B2-Track',
    creditHours: 3,
    prerequisiteIds: [10, 11], // GERL201B1 or GERL201B2
    corequisiteIds: [],
  },
  14: {
    id: 14,
    code: 'MATH101',
    name: 'Calculus I',
    creditHours: 3,
    prerequisiteIds: [51], // MATH0099
    corequisiteIds: [],
  },
  15: {
    id: 15,
    code: 'MATH102',
    name: 'Calculus II',
    creditHours: 3,
    prerequisiteIds: [14], // MATH101
    corequisiteIds: [],
  },
  16: {
    id: 16,
    code: 'CS116',
    name: 'Computing Fundamentals',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [17], // CS1160
  },
  17: {
    id: 17,
    code: 'CS1160',
    name: 'Computing Fundamentals Lab',
    creditHours: 1,
    prerequisiteIds: [],
    corequisiteIds: [16], // CS116
  },
  18: {
    id: 18,
    code: 'CS117',
    name: 'Object-Oriented Programming',
    creditHours: 3,
    prerequisiteIds: [16, 17], // CS116, CS1160
    corequisiteIds: [19], // CS1170
  },
  19: {
    id: 19,
    code: 'CS1170',
    name: 'Object-Oriented Programming Lab',
    creditHours: 1,
    prerequisiteIds: [16, 17], // CS116, CS1160
    corequisiteIds: [18], // CS117
  },
  20: {
    id: 20,
    code: 'CE212',
    name: 'Digital Systems',
    creditHours: 3,
    prerequisiteIds: [16, 51, 52, 50], // CS116, MATH0099, ARB0099, ENGL0099
    corequisiteIds: [],
  },
  21: {
    id: 21,
    code: 'CE2120',
    name: 'Digital Systems Lab',
    creditHours: 1,
    prerequisiteIds: [16, 51, 52, 50], // CS116, CE212, MATH0099, ARB0099, ENGL0099
    corequisiteIds: [20],
  },
  22: {
    id: 22,
    code: 'EE317',
    name: 'Linear Algebra',
    creditHours: 3,
    prerequisiteIds: [14, 15], // MATH101, MATH102
    corequisiteIds: [],
  },
  23: {
    id: 23,
    code: 'GERL301B1',
    name: 'German V B1-Track',
    creditHours: 3,
    prerequisiteIds: [12, 13], // GERL202B1 or GERL202B2
    corequisiteIds: [],
  },
  24: {
    id: 24,
    code: 'GERL301B2',
    name: 'German V B2-Track',
    creditHours: 3,
    prerequisiteIds: [12, 13], // GERL202B1 or GERL202B2
    corequisiteIds: [],
  },
  25: {
    id: 25,
    code: 'GERL302B1',
    name: 'German VI B1-Track',
    creditHours: 3,
    prerequisiteIds: [23, 24], // GERL301B1 or GERL301B2
    corequisiteIds: [],
  },
  26: {
    id: 26,
    code: 'GERL302B2',
    name: 'German VI B2-Track',
    creditHours: 3,
    prerequisiteIds: [23, 24], // GERL301B1 or GERL301B2
    corequisiteIds: [],
  },
  27: {
    id: 27,
    code: 'IE0121',
    name: 'Probability and Statistics',
    creditHours: 3,
    prerequisiteIds: [14], // MATH101
    corequisiteIds: [],
  },
  28: {
    id: 28,
    code: 'CS201',
    name: 'Discrete Structures',
    creditHours: 3,
    prerequisiteIds: [51, 52, 50], // MATH0099, ARB0099, ENGL0099
    corequisiteIds: [],
  },
  29: {
    id: 29,
    code: 'CE201',
    name: 'Computer Architecture and Organization',
    creditHours: 3,
    prerequisiteIds: [20, 51, 52, 50], // MATH0099, ARB0099, ENGL0099
    corequisiteIds: [],
  },
  30: {
    id: 30,
    code: 'CS222',
    name: 'Theory of Algorithms',
    creditHours: 3,
    prerequisiteIds: [16, 28, 52, 50, 51], // CS116, CS201, ARB0099, ENGL0099, MATH0099
    corequisiteIds: [],
  },
  31: {
    id: 31,
    code: 'CS223',
    name: 'Data Structures',
    creditHours: 3,
    prerequisiteIds: [16, 52, 50, 51], // CS116, ARB0099, ENGL0099, MATH0099
    corequisiteIds: [],
  },
  32: {
    id: 32,
    code: 'CS264',
    name: 'Visual Programming',
    creditHours: 3,
    prerequisiteIds: [18, 33, 52, 50, 51], // CS117, CS263, ARB0099, ENGL0099, MATH0099
    corequisiteIds: [],
  },
  33: {
    id: 33,
    code: 'CS263',
    name: 'Database Management Systems',
    creditHours: 3,
    prerequisiteIds: [18, 52, 50, 51], // CS117, ARB0099, ENGL0099, MATH0099
    corequisiteIds: [],
  },
  34: {
    id: 34,
    code: 'CS323',
    name: 'Computational Theory',
    creditHours: 3,
    prerequisiteIds: [30, 31], // CS222, CS223
    corequisiteIds: [],
  },
  35: {
    id: 35,
    code: 'CS342',
    name: 'Software Engineering',
    creditHours: 3,
    prerequisiteIds: [31], // CS223
    corequisiteIds: [],
  },
  36: {
    id: 36,
    code: 'CE352',
    name: 'Computer Networks',
    creditHours: 3,
    prerequisiteIds: [29], // CE201
    corequisiteIds: [],
  },
  37: {
    id: 37,
    code: 'CS355',
    name: 'Web Technologies',
    creditHours: 3,
    prerequisiteIds: [18, 33], // CS117, CS263
    corequisiteIds: [],
  },
  38: {
    id: 38,
    code: 'CS356',
    name: 'Information Security',
    creditHours: 3,
    prerequisiteIds: [31], // CS223
    corequisiteIds: [],
  },
  39: {
    id: 39,
    code: 'CE357',
    name: 'Operating Systems',
    creditHours: 3,
    prerequisiteIds: [29], // CE201
    corequisiteIds: [],
  },
  40: {
    id: 40,
    code: 'CE3570',
    name: 'Operating Systems Lab',
    creditHours: 1,
    prerequisiteIds: [29], // CE201
    corequisiteIds: [39], // CE357
  },
  41: {
    id: 41,
    code: 'CS391',
    name: 'Field Training',
    creditHours: 0,
    prerequisiteIds: [], // Dept. Approval
    corequisiteIds: [],
  },
  42: {
    id: 42,
    code: 'CS416',
    name: 'Systems Programming',
    creditHours: 3,
    prerequisiteIds: [31], // CS223
    corequisiteIds: [],
  },
  43: {
    id: 43,
    code: 'CS451',
    name: 'Artificial Intelligence',
    creditHours: 3,
    prerequisiteIds: [30, 31], // CS222, CS223
    corequisiteIds: [],
  },
  44: {
    id: 44,
    code: 'CS491',
    name: 'International Internship 20 weeks',
    creditHours: 12,
    prerequisiteIds: [41], // CS391
    corequisiteIds: [],
  },
  45: {
    id: 45,
    code: 'CS492',
    name: 'Senior Project',
    creditHours: 3,
    prerequisiteIds: [], // Dept. Approval
    corequisiteIds: [],
  },
  46: {
    id: 46,
    code: 'CS330',
    name: 'Image Understanding',
    creditHours: 3,
    prerequisiteIds: [31, 22], // CS223, EE317
    corequisiteIds: [],
  },
  47: {
    id: 47,
    code: 'CS332',
    name: 'Computer Graphics',
    creditHours: 3,
    prerequisiteIds: [31, 22], // CS223, EE317
    corequisiteIds: [],
  },
  48: {
    id: 48,
    code: 'CS419',
    name: 'Compiler Construction',
    creditHours: 3,
    prerequisiteIds: [30, 31], // CS222, CS223
    corequisiteIds: [],
  },
  49: {
    id: 49,
    code: 'CS477',
    name: 'Mobile Computing',
    creditHours: 3,
    prerequisiteIds: [18, 33], // CS117, CS263
    corequisiteIds: [],
  },
  // Additional entries for courses not in the original object but referenced in prerequisites
  50: {
    id: 50,
    code: 'ENGL0099',
    name: 'Intermediate English',
    creditHours: 3,
    prerequisiteIds: [53],
    corequisiteIds: [],
  },
  51: {
    id: 51,
    code: 'MATH0099',
    name: 'Pre Math',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [],
  },
  52: {
    id: 52,
    code: 'ARB0099',
    name: 'Elementary Arabic',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [],
  },
  53: {
    id: 53,
    code: 'ENGL0098',
    name: 'Elementary English',
    creditHours: 3,
    prerequisiteIds: [],
    corequisiteIds: [],
  },
}
