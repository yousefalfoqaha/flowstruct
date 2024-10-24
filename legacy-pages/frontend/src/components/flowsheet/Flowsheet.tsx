  import { semesters } from '@/data/semesters'
  import { Semester } from './Semester'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '../ui/card'
  import StudyPlanProvider from '@/providers/StudyPlanProvider'
  import { StudyPlan } from '../study-plan/StudyPlan'
  import { useFlowsheet } from '@/hooks/useFlowsheet'

  export function Flowsheet() {
    const { selectedSemester } = useFlowsheet()
    return (
      <>
        <Card className="h-screen">
          <CardHeader className="text-xl">
            <CardTitle>Bachelor of Computer Science Flowsheet</CardTitle>
            <CardDescription>
              2023/2024 - General Track (New Remedials)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex justify-center gap-1">
              {Object.values(semesters).map((semester) => {
                if (!semester) return null
                return (
                  <li key={semester.id}>
                    <Semester id={semester.id} order={semester.order} />
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        {selectedSemester && (
          <StudyPlanProvider>
            <StudyPlan />
          </StudyPlanProvider>
        )}
      </>
    )
  }
