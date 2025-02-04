import { Routes, Route } from 'react-router-dom'
import { Lottery, Home, Style, History } from './pages'
import { HistoryProvider } from './contexts/historyContext'

function App() {
  return (
    <>
      <HistoryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/style" element={<Style />} />
          <Route path="/lottery" element={<Lottery />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </HistoryProvider>
    </>
  )
}

export default App
