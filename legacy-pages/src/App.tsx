import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'
import { Button } from './components/ui/button'

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
      semesterIds: [1, 2],
    },
    2: {
      id: 2,
      semesterIds: [3],
    },
  },
  semesters: {
    1: {
      id: 1,
      courseIds: [16, 17],
    },
    2: {
      id: 2,
      courseIds: [20, 21],
    },
    3: {
      id: 3,
      courseIds: [18, 19],
    },
  },
  addedCourses: [16, 17, 20, 21, 18, 19],
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

  return <Flowsheet flowsheet={flowsheet} dispatch={dispatch} />
}

function Flowsheet({
  flowsheet,
  dispatch,
}: {
  flowsheet: flowsheetState
  dispatch: any
}) {
  return (
    <div className="flex gap-1">
      {Object.values(flowsheet.years).map((year: Year) => {
        if (!year) return null
        return (
          <ul key={year.id}>
            <Year
              id={year.id}
              semesterIds={year.semesterIds}
              flowsheet={flowsheet}
              dispatch={dispatch}
            />
          </ul>
        )
      })}
    </div>
  )
}

function Year({
  id,
  semesterIds,
  flowsheet,
  dispatch,
}: Year & { flowsheet: flowsheetState; dispatch: any }) {
  return (
    <section>
      <header className="bg-zinc-200 px-10 text-center">Year {id}</header>
      <ul className="flex gap-1">
        {semesterIds.map((id) => {
          const semester = flowsheet.semesters[id]
          if (!semester) return null
          return (
            <li key={id}>
              <Semester
                id={id}
                courseIds={semester.courseIds}
                dispatch={dispatch}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Semester({ id, courseIds, dispatch }: Semester & { dispatch: any }) {
  const handleAddCourse = (semesterId: number, courseId: number) =>
    dispatch({ type: 'ADD_COURSE', payload: { semesterId, courseId } })

  return (
    <section className="flex flex-col gap-1">
      <header className="text-center">Semester {id}</header>
      <ul className="flex flex-col gap-1">
        {courseIds.map((id) => {
          const course = courses[id]
          if (!course) return null
          return (
            <li key={id}>
              <Course
                id={id}
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
              />
            </li>
          )
        })}
      </ul>
      <Button onClick={() => handleAddCourse(id, 22)} variant="outline">
        Add course
      </Button>
    </section>
  )
}

function Course({ code, name, creditHours }: Course) {
  return (
    <div className="border rounded transition-all hover:bg-blue-100 cursor-pointer flex flex-col p-3 bg-zinc-200 w-36 h-36">
      <header className="text-left flex gap-2 w-full">
        <h1 className="font-semibold">{code}</h1>
      </header>
      <p className="whitespace-normal font-normal text-sm overflow-hidden text-ellipsis line-clamp-3">
        {name}
      </p>
      <footer className="w-full mt-auto flex text-xs font-semibold text-muted-foreground">
        <p className="ml-auto">{creditHours} Cr Hr</p>
      </footer>
    </div>
  )
}
