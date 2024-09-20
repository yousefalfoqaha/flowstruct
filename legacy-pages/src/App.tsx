import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'

type Flowsheet = {
  id: 1
  name: string
}

type Semester = {
  id: number
  courseIds: number[]
}

interface State {
  flowsheet: Flowsheet
  semesters: { [key: number]: Semester }
  addedCourses: number[]
  error: string | null
}

const initialFlowsheet: State = {
  flowsheet: {
    id: 1,
    name: 'Computer Science 2023/2024 - General Track',
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
  },
  addedCourses: [],
  error: null,
}

const courses: { [key: number]: string } = {
  1: 'Course 1',
  2: 'Course 2',
  3: 'Course 3',
  4: 'Course 4',
  5: 'Course 5',
  6: 'Course 6',
}

type Action =
  | { type: 'ADD_COURSE'; payload: { semesterId: number; courseId: number } }
  | { type: 'ADD_SEMESTER'; payload: {} }

function flowsheetReducer(draft: Draft<State>, action: Action) {
  const { type, payload } = action

  switch (type) {
    case 'ADD_COURSE':
      const { semesterId, courseId } = payload
      if (draft.addedCourses.includes(courseId))
        return alert(`tf u think ur doing with my boy Course ${courseId}`)
      draft.semesters[semesterId].courseIds.push(courseId)
      draft.addedCourses.push(courseId)
      break
    case 'ADD_SEMESTER':

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

  const handleAddSemester = () =>
    dispatch({ type: 'ADD_SEMESTER', payload: {} })

  return (
    <div className="flex justify-center bg-neutral-900 h-screen text-neutral-200">
      {Object.values(flowsheet.semesters).map((semester: Semester) => {
        return (
          <section key={semester.id} className="text-center m-5">
            <header className="font-semibold">Semester {semester.id}</header>
            <div className="flex flex-col">
              {semester.courseIds.map((id) => {
                return <div key={id}>{courses[id]}</div>
              })}
              <button
                onClick={() => handleAddCourse(semester.id, 4)}
                className="mt-1 hover:bg-purple-400/50 rounded p-2 border w-32 border-zinc-500"
              >
                add course
              </button>
            </div>
          </section>
        )
      })}
      <button
        onClick={handleAddSemester}
        className="mt-1 hover:bg-purple-400/50 rounded p-2 border w-32 border-zinc-500"
      >
        Add Semester
      </button>
    </div>
  )
}
