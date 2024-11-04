import { semesters } from '@/data/semesters'
import { Semester } from './Semester'
import StudyPlanProvider from '@/providers/StudyPlanProvider'
import { StudyPlan } from '../study-plan/StudyPlan'
import { useFlowsheet } from '@/hooks/useFlowsheet'

export function Flowsheet() {
  const { selectedSemester } = useFlowsheet()
  return (
    <div className='h-screen'>
      <div className='m-7 overflow-auto h-full'>
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
      </div>
      {selectedSemester && (
        <StudyPlanProvider>
          <StudyPlan />
        </StudyPlanProvider>
      )}
    </div>
  )
}
