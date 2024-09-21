import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'
import { Button } from './components/ui/button'
import { Plus, Trash } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { ScrollArea } from './components/ui/scroll-area'
import { useState } from 'react'

type Year = {
  id: number
  semesterIds: number[]
}

type Semester = {
  id: number
  courseIds: number[]
}

interface flowsheetState {
  id: number
  name: string
  numberOfYears: number
  years: { [key: number]: Year }
  semesters: { [key: number]: Semester }
  addedCourseIds: number[]
  error: string | null
}

const initialFlowsheet: flowsheetState = {
  id: 1,
  name: 'Computer Science 2023/2024 - General Track',
  numberOfYears: 4,
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
        return alert(`${course.name} is already added to the flowsheet`)

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
    <section className="flex flex-col justify-center">
      <header>{flowsheet.name}</header>
      <ul className="flex gap-1">
        {Object.values(flowsheet.years).map((year: Year) => {
          if (!year) return null // will inform user of the null components to be deleted
          return (
            <li key={year.id}>
              <Year
                id={year.id}
                semesterIds={year.semesterIds}
                flowsheet={flowsheet}
                dispatch={dispatch} // need useContext to avoid prop drilling
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Year({
  id: yearId,
  semesterIds,
  flowsheet,
  dispatch,
}: Year & { flowsheet: flowsheetState; dispatch: any }) {
  return (
    <section>
      <header className="bg-zinc-200 px-10 text-center">Year {yearId}</header>
      <ul className="flex gap-1">
        {semesterIds.map((id) => {
          const semester = flowsheet.semesters[id]
          if (!semester) return null
          return (
            <li key={id}>
              <Semester
                id={id}
                courseIds={semester.courseIds}
                flowsheet={flowsheet}
                dispatch={dispatch} // need useContext to avoid prop drilling
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
  flowsheet,
  dispatch,
}: Semester & { flowsheet: flowsheetState; dispatch: any }) {
  return (
    <section className="flex flex-col gap-1 w-36">
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
                isAdded={true}
                dispatch={dispatch}
              />
            </li>
          )
        })}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add course</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Study Plan Courses</DialogTitle>
            <DialogDescription>
              Add available courses to semester {semesterId}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea>
            <ul className="grid grid-cols-3 gap-1 w-fit">
              {Object.values(courses).map((course) => {
                if (flowsheet.addedCourseIds.includes(course.id)) return null
                return (
                  <li key={course.id}>
                    <Course
                      id={course.id}
                      code={course.code}
                      name={course.name}
                      creditHours={course.creditHours}
                      semesterId={semesterId}
                      isAdded={false}
                      dispatch={dispatch}
                    />
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Course({
  id: courseId,
  code,
  name,
  creditHours,
  semesterId,
  isAdded,
  dispatch,
}: Course & {
  semesterId: number
  isAdded: boolean
  dispatch: any
}) {
  const handleCourseAction = (
    actionType: string,
    semesterId: number,
    courseId: number
  ) => dispatch({ type: actionType, payload: { semesterId, courseId } })
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
          handleCourseAction(
            isAdded ? 'REMOVE_COURSE' : 'ADD_COURSE',
            semesterId,
            courseId
          )
        }
        variant="ghost"
        className={`${
          isAdded ? 'hover:text-red-600' : 'hover:text-red-600'
        } px-2 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all`}
      >
        {isAdded ? (
          <Trash className="scale-90" />
        ) : (
          <Plus className="scale-90" />
        )}
      </Button>
    </div>
  )
}
