import { Flowsheet } from './components/Flowsheet/Flowsheet'
import { SemestersProvider } from './providers/SemestersProvider'

export default function App() {
  return (
    <SemestersProvider>
      <Flowsheet />
    </SemestersProvider>
  )
}
