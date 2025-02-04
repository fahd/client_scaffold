import { useContext } from 'react'
import { HistoryContext } from '../contexts/historyContext'

export const useHistory = () => {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory has to be used within HistoryProvider')
  }
  return context
}
