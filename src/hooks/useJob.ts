import { useContext } from 'react'
import { JobContext } from '../contexts/jobContext'

export const useJob = () => {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error('useJob has to be used within the JobHistoryProvider')
  }
  return context
}
