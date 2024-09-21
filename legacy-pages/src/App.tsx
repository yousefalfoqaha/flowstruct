import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'

type Flowsheet = {
  id: number
  name: string
  numberOfYears: number
}

type Year = {
  id: number
  semesterIds: number[]
}

type Semester = {
  id: number
  courseIds: number[]
}

interface flowsheetState {
  flowsheet: Flowsheet
  years: { [key: number]: Year }
  semesters: { [key: number]: Semester }
  addedCourses: number[]
  error: string | null
}

const initialFlowsheet: flowsheetState = {
  flowsheet: {
    id: 1,
    name: 'Computer Science 2023/2024 - General Track',
    numberOfYears: 4,
  },
  years: {
    1: {
      id: 1,
      semesterIds: [],
    },
  },
  semesters: {},
  addedCourses: [],
  error: null,
}

type Course = {
  id: number
  code: string
  name: string
  creditHours: number
}

const courses: { [key: number]: Course } = {
  16: {
    id: 16,
    code: 'CS116',
    name: 'Computing Fundamentals',
    creditHours: 3,
  },
  17: {
    id: 17,
    code: 'CS1160',
    name: 'Computing Fundamentals Lab',
    creditHours: 1,
  },
  18: {
    id: 18,
    code: 'CS117',
    name: 'Object-Oriented Programming',
    creditHours: 3,
  },
  19: {
    id: 19,
    code: 'CS1170',
    name: 'Object-Oriented Programming Lab',
    creditHours: 1,
  },
  20: {
    id: 20,
    code: 'CE212',
    name: 'Digital Systems',
    creditHours: 3,
  },
  21: {
    id: 21,
    code: 'CE2120',
    name: 'Digital Systems Lab',
    creditHours: 1,
  },
  22: {
    id: 22,
    code: 'EE317',
    name: 'Linear Algebra',
    creditHours: 3,
  },
}

type Action = {
  type: 'ADD_COURSE'
  payload: { semesterId: number; courseId: number }
}

function flowsheetReducer(draft: Draft<flowsheetState>, action: Action) {
  const { semesters, addedCourses } = draft
  const { type, payload } = action

  switch (type) {
    case 'ADD_COURSE':
      const { semesterId, courseId } = payload
      if (!courses[courseId]) return alert(`Course not found in study plan`)
      if (addedCourses.includes(courseId))
        return alert(
          `${courses[courseId].name} is already added to the flowsheet`
        )
      semesters[semesterId].courseIds.push(courseId)
      addedCourses.push(courseId)
      break
    default:
      break
  }
}

export default function App() {
  const [flowsheet, dispatch] = useImmerReducer(
    flowsheetReducer,
    initialFlowsheet
  )

  const handleAddCourse = (semesterId: number, courseId: number) =>
    dispatch({ type: 'ADD_COURSE', payload: { semesterId, courseId } })

  return (
    <div className="flex justify-center h-full">
      {Object.values(flowsheet.years).map((year: Year) => (
        <section key={year.id}>
          <header>Year {year.id}</header>
          <div className="flex gap-1">
            {year.semesterIds.map((id) => {
              const semester = flowsheet.semesters[id]
              if (!semester) return null
              return (
                <section key={semester.id} className="m-5">
                  <header className="font-semibold text-center">
                    Semester {semester.id}
                  </header>
                  <div className="flex flex-col items-center">
                    {semester.courseIds.map((id) => {
                      const course = courses[id]
                      if (!course) return null
                      return (
                        <div
                          key={course.id}
                          className="p-2 h-36 w-36 transition-all border border-neutral-300 hover:shadow rounded-md flex flex-col bg-neutral-200 hover:bg-purple-400/30"
                        >
                          <header className="font-semibold">
                            {course.code}
                          </header>
                          <p className="line-clamp-3">{course.name}</p>
                          <footer className="text-right mt-auto text-neutral-500">
                            {course.creditHours} Cr Hr
                          </footer>
                        </div>
                      )
                    })}
                    <button
                      onClick={() => handleAddCourse(semester.id, 16)}
                      className="mt-1 hover:bg-purple-400/50 rounded p-2 border min-w-28 border-zinc-300 w-full transition-all"
                    >
                      +
                    </button>
                  </div>
                </section>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
