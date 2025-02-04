import React, { createContext, useState, useEffect } from 'react'

interface GameHistory {
  number: number
  won: boolean
}

interface HistoryContextType {
  history: GameHistory[]
  onAddGame: (number: number, won: boolean) => void
}

// First Export => History Context
export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
)

// Second Export => History Provider
export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, updateHistory] = useState<GameHistory[]>(() => {
    const storedHistory = localStorage.getItem('gameHistory')
    return storedHistory ? JSON.parse(storedHistory) : []
  })

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(history))
  }, [history])

  const onAddGame = (number: number, won: boolean) => {
    const newGame = { number, won }
    updateHistory((prev) => [...prev, newGame])
  }

  return (
    <HistoryContext.Provider value={{ history, onAddGame }}>
      {children}
    </HistoryContext.Provider>
  )
}
