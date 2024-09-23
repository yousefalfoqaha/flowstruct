import { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'
import { Button } from './components/ui/button'
import { ArrowLeftFromLine, Plus, Trash } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { ScrollArea } from './components/ui/scroll-area'
import { createContext, ReactNode, useContext, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'

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
  years: { [key: number]: Year }
  semesters: { [key: number]: Semester }
  error: string | null
}

const initialFlowsheet: flowsheetState = {
  id: 1,
  name: 'Computer Science 2023/2024 - General Track',
  years: {
    1: {
      id: 1,
      semesterIds: [1, 2],
    },
    2: {
      id: 2,
      semesterIds: [3, 4],
    },
    3: {
      id: 3,
      semesterIds: [5, 6],
    },
    4: {
      id: 4,
      semesterIds: [7, 8],
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
    4: {
      id: 4,
      courseIds: [],
    },
    5: {
      id: 5,
      courseIds: [],
    },
    6: {
      id: 6,
      courseIds: [],
    },
    7: {
      id: 7,
      courseIds: [],
    },
    8: {
      id: 8,
      courseIds: [44],
    },
  },
  error: null,
}

type Section = {
  id: number
  name: string
  requiredCreditHours: number
  courseIds: number[]
}

type StudyPlan = {
  id: number
  name: string
  sections: { [key: number]: Section }
}

const studyPlan: StudyPlan = {
  id: 1,
  name: 'Computer Science 2023/2024 - General Track',
  sections: {
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
  },
}

type Course = {
  id: number
  code: string
  name: string
  creditHours: number
}

const courses: { [key: number]: Course } = {
  1: {
    id: 1,
    code: 'ARB100',
    name: 'Arabic',
    creditHours: 3,
  },
  2: {
    id: 2,
    code: 'ENGL1001',
    name: 'Upper-Intermediate English',
    creditHours: 3,
  },
  3: {
    id: 3,
    code: 'ENGL1002',
    name: 'Advanced English',
    creditHours: 3,
  },
  4: {
    id: 4,
    code: 'GERL101B1',
    name: 'German I B1-Track',
    creditHours: 3,
  },
  5: {
    id: 5,
    code: 'GERL102B1',
    name: 'German II B1-Track',
    creditHours: 3,
  },
  6: {
    id: 6,
    code: 'GERL102B2',
    name: 'German II B2-Track',
    creditHours: 3,
  },
  7: {
    id: 7,
    code: 'MILS100',
    name: 'Military Science',
    creditHours: 3,
  },
  8: {
    id: 8,
    code: 'NE101',
    name: 'National Education',
    creditHours: 3,
  },
  9: {
    id: 9,
    code: 'NEE101',
    name: 'National Education in English',
    creditHours: 3,
  },
  10: {
    id: 10,
    code: 'GERL201B1',
    name: 'German III B1-Track',
    creditHours: 3,
  },
  11: {
    id: 11,
    code: 'GERL201B2',
    name: 'German III B2-Track',
    creditHours: 3,
  },
  12: {
    id: 12,
    code: 'GERL202B1',
    name: 'German IV B1-Track',
    creditHours: 3,
  },
  13: {
    id: 13,
    code: 'GERL202B2',
    name: 'German IV B2-Track',
    creditHours: 3,
  },
  14: {
    id: 14,
    code: 'MATH101',
    name: 'Calculus I',
    creditHours: 3,
  },
  15: {
    id: 15,
    code: 'MATH102',
    name: 'Calculus II',
    creditHours: 3,
  },
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
  23: {
    id: 23,
    code: 'GERL301B1',
    name: 'German V B1-Track',
    creditHours: 3,
  },
  24: {
    id: 24,
    code: 'GERL301B2',
    name: 'German V B2-Track',
    creditHours: 3,
  },
  25: {
    id: 25,
    code: 'GERL302B1',
    name: 'German VI B1-Track',
    creditHours: 3,
  },
  26: {
    id: 26,
    code: 'GERL302B2',
    name: 'German VI B2-Track',
    creditHours: 3,
  },
  27: {
    id: 27,
    code: 'IE0121',
    name: 'Probability and Statistics',
    creditHours: 3,
  },
  28: {
    id: 28,
    code: 'CS201',
    name: 'Discrete Structures',
    creditHours: 3,
  },
  29: {
    id: 29,
    code: 'CE201',
    name: 'Computer Architecture and Organization',
    creditHours: 3,
  },
  30: {
    id: 30,
    code: 'CS222',
    name: 'Theory of Algorithms',
    creditHours: 3,
  },
  31: {
    id: 31,
    code: 'CS223',
    name: 'Data Structures',
    creditHours: 3,
  },
  32: {
    id: 32,
    code: 'CS264',
    name: 'Visual Programming',
    creditHours: 3,
  },
  33: {
    id: 33,
    code: 'CS263',
    name: 'Database Management Systems',
    creditHours: 3,
  },
  34: {
    id: 34,
    code: 'CS323',
    name: 'Computational Theory',
    creditHours: 3,
  },
  35: {
    id: 35,
    code: 'CS342',
    name: 'Software Engineering',
    creditHours: 3,
  },
  36: {
    id: 36,
    code: 'CE352',
    name: 'Computer Networks',
    creditHours: 3,
  },
  37: {
    id: 37,
    code: 'CS355',
    name: 'Web Technologies',
    creditHours: 3,
  },
  38: {
    id: 38,
    code: 'CS356',
    name: 'Information Security',
    creditHours: 3,
  },
  39: {
    id: 39,
    code: 'CE357',
    name: 'Operating Systems',
    creditHours: 3,
  },
  40: {
    id: 40,
    code: 'CE3570',
    name: 'Operating Systems Lab',
    creditHours: 1,
  },
  41: {
    id: 41,
    code: 'CS391',
    name: 'Field Training',
    creditHours: 0,
  },
  42: {
    id: 42,
    code: 'CS416',
    name: 'Systems Programming',
    creditHours: 3,
  },
  43: {
    id: 43,
    code: 'CS451',
    name: 'Artificial Intelligence',
    creditHours: 3,
  },
  44: {
    id: 44,
    code: 'CS491',
    name: 'International Internship 20 weeks',
    creditHours: 12,
  },
  45: {
    id: 45,
    code: 'CS492',
    name: 'Senior Project',
    creditHours: 3,
  },
  46: {
    id: 46,
    code: 'CS330',
    name: 'Image Understanding',
    creditHours: 3,
  },
  47: {
    id: 47,
    code: 'CS332',
    name: 'Computer Graphics',
    creditHours: 3,
  },
  48: {
    id: 48,
    code: 'CS419',
    name: 'Compiler Construction',
    creditHours: 3,
  },
  49: {
    id: 49,
    code: 'CS477',
    name: 'Mobile Computing',
    creditHours: 3,
  },
}

function isAdded(
  courseId: number,
  semesters: { [key: number]: Semester }
): boolean {
  return Object.values(semesters).some((semester) =>
    semester.courseIds.includes(courseId)
  )
}

type Action =
  | { type: 'ADD_COURSE'; payload: { semesterId: number; courseId: number } }
  | { type: 'REMOVE_COURSE'; payload: { semesterId: number; courseId: number } }

function flowsheetReducer(draft: Draft<flowsheetState>, action: Action) {
  let { semesters } = draft
  const { type, payload } = action

  switch (type) {
    case 'ADD_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]

      if (!course || !semester) return alert('Course or semester not found')
      if (isAdded(courseId, semesters))
        return alert(`${course.name} is already added to the flowsheet`)

      semester.courseIds.push(courseId)
      break
    }

    case 'REMOVE_COURSE': {
      const { semesterId, courseId } = payload
      const course = courses[courseId]
      const semester = semesters[semesterId]

      if (!course || !semester) return alert(`Course or semester not found`)
      if (!isAdded(courseId, semesters))
        return alert(`${course.name} is not in the flowsheet`)

      semester.courseIds.splice(semester.courseIds.indexOf(courseId), 1)
      break
    }

    default:
      alert('Invalid dispatch type')
      break
  }
}

const FlowsheetContext = createContext<flowsheetState | undefined>(undefined)
const FlowsheetDispatchContext = createContext<any | undefined>(undefined)

function useFlowsheetContext() {
  const flowsheet = useContext(FlowsheetContext)
  const dispatch = useContext(FlowsheetDispatchContext)

  if (!flowsheet || !dispatch) {
    throw new Error(
      'FlowsheetContext or FlowsheetDispatchContext must be used within a FlowsheetProvider'
    )
  }

  return { flowsheet, dispatch }
}

function FlowsheetProvider({ children }: { children: ReactNode }) {
  const [flowsheet, dispatch] = useImmerReducer(
    flowsheetReducer,
    initialFlowsheet
  )

  return (
    <FlowsheetContext.Provider value={flowsheet}>
      <FlowsheetDispatchContext.Provider value={dispatch}>
        {children}
      </FlowsheetDispatchContext.Provider>
    </FlowsheetContext.Provider>
  )
}

export default function FlowsheetApp() {
  return (
    <FlowsheetProvider>
      <Flowsheet />
    </FlowsheetProvider>
  )
}

function Flowsheet() {
  const { flowsheet } = useFlowsheetContext()
  return (
    <section className="flex flex-col justify-center">
      <header>{flowsheet.name}</header>
      <ul className="flex gap-1">
        {Object.values(flowsheet.years).map((year: Year) => {
          if (!year) return null // will inform user of the null components to be deleted
          return (
            <li key={year.id}>
              <Year id={year.id} semesterIds={year.semesterIds} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Year({ id: yearId, semesterIds }: Year) {
  const { flowsheet } = useFlowsheetContext()
  return (
    <section>
      <header className="bg-zinc-200 px-10 text-center">Year {yearId}</header>
      <ul className="flex gap-1">
        {semesterIds.map((id) => {
          const semester = flowsheet.semesters[id]
          if (!semester) return null
          return (
            <li key={id}>
              <Semester id={id} courseIds={semester.courseIds} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Semester({ id: semesterId, courseIds }: Semester) {
  const { dispatch } = useFlowsheetContext()

  const removeCourseFromFlowsheet = (semesterId: number, courseId: number) => {
    dispatch({ type: 'REMOVE_COURSE', payload: { semesterId, courseId } })
  }

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
                id={course.id}
                code={course.code}
                name={course.name}
                creditHours={course.creditHours}
                status="FLOWSHEET"
                onClick={() => removeCourseFromFlowsheet(semesterId, course.id)}
              />
            </li>
          )
        })}
      </ul>
      <StudyPlan semesterId={semesterId} />
    </section>
  )
}

function Section({
  id,
  name,
  requiredCreditHours,
  courseIds,
  pendingCourseIds,
  pendCourse,
}: Section & {
  pendingCourseIds: number[]
  pendCourse: (courseId: number) => void
}) {
  const { flowsheet } = useFlowsheetContext()

  return (
    <AccordionItem value={`item-${id}`} className="px-2">
      <AccordionTrigger>
        <section className="text-left">
          <p className="font-normal text-start pr-4">{name}</p>
          <p className="mt-1 font-semibold text-xs text-muted-foreground">
            {requiredCreditHours} Cr Hrs required
          </p>
        </section>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col gap-1">
          {courseIds.map((id) => {
            const course = courses[id]
            if (
              !course ||
              pendingCourseIds.includes(id) ||
              isAdded(id, flowsheet.semesters)
            )
              return null
            return (
              <li key={course.id} className="w-full">
                <Course
                  id={course.id}
                  code={course.code}
                  name={course.name}
                  creditHours={course.creditHours}
                  status="STUDY_PLAN"
                  onClick={() => pendCourse(course.id)}
                />
              </li>
            )
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

function StudyPlan({ semesterId }: { semesterId: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [pendingCourseIds, setPendingCourseIds] = useState<number[]>([])

  const { dispatch } = useFlowsheetContext()

  const pendCourse = (courseId: number) => {
    setPendingCourseIds([...pendingCourseIds, courseId])
  }

  const unpendCourse = (courseId: number) => {
    setPendingCourseIds(pendingCourseIds.filter((id) => id !== courseId))
  }

  const addCourseToFlowsheet = (courseId: number) => {
    dispatch({ type: 'ADD_COURSE', payload: { semesterId, courseId } })
  }

  const clearPendingCourses = () => {
    setPendingCourseIds([])
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) clearPendingCourses()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add course</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[60rem] max-h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle>Study Plan Courses</DialogTitle>
          <DialogDescription>
            Add available courses to semester {semesterId}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 w-full">
          <ScrollArea className="border rounded-lg h-[30rem] p-1 w-full">
            <Accordion type="single" collapsible>
              {Object.values(studyPlan.sections).map((section) => {
                return (
                  <Section
                    key={section.id}
                    id={section.id}
                    name={section.name}
                    requiredCreditHours={section.requiredCreditHours}
                    courseIds={section.courseIds}
                    pendingCourseIds={pendingCourseIds}
                    pendCourse={pendCourse}
                  />
                )
              })}
            </Accordion>
          </ScrollArea>
          <section>
            <div className="flex flex-col p-2 gap-1 border rounded-lg h-full w-40">
              {pendingCourseIds.length === 0 ? (
                <p className="text-muted-foreground text-sm m-auto text-center">
                  No courses
                  <br />
                  selected
                </p>
              ) : (
                pendingCourseIds.map((id: number) => {
                  const course = courses[id]
                  return (
                    <Course
                      key={course.id}
                      id={course.id}
                      code={course.code}
                      name={course.name}
                      creditHours={course.creditHours}
                      status="PENDING"
                      onClick={() => unpendCourse(course.id)}
                    />
                  )
                })
              )}
            </div>
          </section>
        </div>
        <DialogFooter className="w-full flex flex-row">
          <Button
            onClick={clearPendingCourses}
            variant="outline"
            className="mr-auto"
          >
            Clear selection
          </Button>
          <DialogClose asChild>
            {pendingCourseIds.length === 0 ? (
              <Button disabled className="ml-auto w-40">
                Add 0 courses
              </Button>
            ) : (
              <Button
                onClick={() =>
                  pendingCourseIds.forEach((courseId) =>
                    addCourseToFlowsheet(courseId)
                  )
                }
                className="ml-auto w-40"
              >
                Add {pendingCourseIds.length} courses
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Course({
  code,
  name,
  creditHours,
  status,
  onClick,
}: Course & { status: string; onClick: () => void }) {
  let height = 'h-full'
  let hoverColor = ''
  let icon = null

  switch (status) {
    case 'STUDY_PLAN':
      height = 'h-full'
      hoverColor = 'hover:bg-green-500/50'
      icon = <Plus className="scale-90" />
      break
    case 'PENDING':
      height = 'h-36'
      hoverColor = 'hover:bg-blue-300/50'
      icon = <ArrowLeftFromLine className="scale-90" />
      break
    case 'FLOWSHEET':
      height = 'h-36'
      hoverColor = 'hover:bg-red-500/50'
      icon = <Trash className="scale-90" />
      break
    default:
      height = 'h-full'
      hoverColor = ''
      icon = null
      break
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`group text-left flex flex-col bg-zinc-200 p-3 w-full ${height} rounded-md relative ${hoverColor}`} // apply hoverColor class here
    >
      <header className="w-full font-semibold">{code}</header>
      <p
        className={`w-full whitespace-normal font-normal text-sm overflow-hidden text-ellipsis line-clamp-3`}
      >
        {name}
      </p>
      <footer className="mt-auto ml-auto flex text-xs font-semibold text-muted-foreground">
        {creditHours} Cr Hr
      </footer>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
        {icon}
      </div>
    </Button>
  )
}
