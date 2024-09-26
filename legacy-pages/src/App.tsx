import { Flowsheet } from './components/Flowsheet'
import { StudyPlan } from './components/StudyPlan'
import { PendingCoursesProvider } from './providers/PendingCoursesProvider'
import { SemestersProvider } from './providers/SemestersProvider'

export default function App() {
  return (
    <SemestersProvider>
      <Flowsheet />
      <PendingCoursesProvider>
        <StudyPlan semesterId={1} />
      </PendingCoursesProvider>
    </SemestersProvider>
  )
}
