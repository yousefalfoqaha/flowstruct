import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'
import { Button } from './components/ui/button'
import { Trash } from 'lucide-react'

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
  addedCourseIds: number[]
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
  },
  addedCourseIds: [],
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

type Action =
  | { type: 'ADD_COURSE'; payload: { semesterId: number; courseId: number } }
  | { type: 'REMOVE_COURSE'; payload: { semesterId: number; courseId: number } }

function flowsheetReducer(draft: Draft<flowsheetState>, action: Action) {
  let { semesters, addedCourseIds } = draft
  const { type, payload } = action

  console.log(addedCourseIds)

  switch (type) {
    case 'ADD_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]

      if (!course || !semester)
        return alert(
          `Course not found in study plan or semester not found in flowsheet`
        )
      if (addedCourseIds.includes(courseId))
        return alert(
          `${courses[courseId].name} is already added to the flowsheet`
        )

      semester.courseIds.push(courseId)
      addedCourseIds.push(courseId)
      break
    }
    case 'REMOVE_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]

      if (!course || !semester)
        return alert(
          `Course not found in study plan or semester not found in flowsheet`
        )
      if (!addedCourseIds.includes(courseId))
        return alert(`${course.name} is not in the flowsheet`)

      semester.courseIds.splice(semester.courseIds.indexOf(courseId), 1)
      addedCourseIds.splice(addedCourseIds.indexOf(courseId), 1)
      break
    }
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

function Semester({
  id: semesterId,
  courseIds,
  dispatch,
}: Semester & { dispatch: any }) {
  const handleCourseAction = (
    actionType: string,
    semesterId: number,
    courseId: number
  ) => dispatch({ type: actionType, payload: { semesterId, courseId } })

  return (
    <section className="flex flex-col gap-1">
      <header className="text-center">Semester {semesterId}</header>
      <ul className="flex flex-col gap-1">
        {courseIds.map((id) => {
          const course = courses[id]
          if (!course) return null
          return (
            <li key={id} className="relative">
              <Course
                id={id}
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
                semesterId={semesterId}
                handleCourseAction={handleCourseAction}
              />
            </li>
          )
        })}
      </ul>
      <Button
        onClick={() => handleCourseAction('ADD_COURSE', semesterId, 22)}
        variant="outline"
      >
        Add course
      </Button>
    </section>
  )
}

function Course({
  id: courseId,
  code,
  name,
  creditHours,
  semesterId,
  handleCourseAction,
}: Course & {
  semesterId: number
  handleCourseAction: (
    actionType: string,
    semesterId: number,
    courseId: number
  ) => void
}) {
  return (
    <div className="group border rounded transition-all hover:bg-blue-100 cursor-pointer flex flex-col p-3 bg-zinc-200 w-36 h-36 relative">
      <header className="text-left flex gap-2 w-full">
        <h1 className="font-semibold">{code}</h1>
      </header>
      <p className="whitespace-normal font-normal text-sm overflow-hidden text-ellipsis line-clamp-3">
        {name}
      </p>
      <footer className="w-full mt-auto flex text-xs font-semibold text-muted-foreground">
        <p className="ml-auto">{creditHours} Cr Hr</p>
      </footer>
      <Button
        onClick={() =>
          handleCourseAction('REMOVE_COURSE', semesterId, courseId)
        }
        variant="ghost"
        className="hover:text-red-600 px-2 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash className="scale-90" />
      </Button>
    </div>
  )
}
