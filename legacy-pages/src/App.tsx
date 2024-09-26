import { Flowsheet } from './components/Flowsheet'
import { SemestersProvider } from './providers/SemestersProvider'

export default function App() {
  return (
    <SemestersProvider>
      <Flowsheet />
    </SemestersProvider>
  )
}
