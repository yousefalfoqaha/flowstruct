import { Flowsheet } from './components/flowsheet/Flowsheet'
import { FlowsheetProvider } from './providers/FlowsheetProvider'

export default function App() {
  return (
  <FlowsheetProvider>
    <Flowsheet />
  </FlowsheetProvider>
)
}
