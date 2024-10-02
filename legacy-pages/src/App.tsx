import { Flowsheet } from './components/flowsheet/Flowsheet'
import { SemestersProvider } from './providers/SemestersProvider'

export default function App() {
  return (
    <SemestersProvider>
      <Flowsheet />
    </SemestersProvider>
  )
}
