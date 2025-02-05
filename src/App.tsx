import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobHistoryProvider from './contexts/jobContext'

function App() {
  return (
    <>
      <JobHistoryProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/jobs/:id" element={<Jobs />}></Route>
        </Routes>
      </JobHistoryProvider>
    </>
  )
}

export default App
