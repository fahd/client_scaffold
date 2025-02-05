import React, { createContext, useState, useEffect } from 'react'

interface Job {
  job_id: number
  job_title: string
  job_description: string
  company_name: string
}

interface JobHistory {
  favorites: JobRecord
  onAddRemoveToFavorites: (job_data: Job) => void
}

interface JobRecord {
  [key: string]: Job
}

export const JobContext = createContext<JobHistory | undefined>(undefined)

const JobHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, updateFavorites] = useState<JobRecord>(() => {
    const storedJobHistory = localStorage.getItem('jobHistory')
    return storedJobHistory ? JSON.parse(storedJobHistory).favorites : {}
  })

  const onAddRemoveToFavorites = (job_data: Job) => {
    updateFavorites((prev) => {
      const newFavorites = { ...prev }
      if (job_data.job_id in newFavorites) {
        delete newFavorites[job_data.job_id]
      } else {
        newFavorites[job_data.job_id] = job_data
      }
      updateLocalStorage(newFavorites)
      return newFavorites
    })
  }

  const updateLocalStorage = (favorites: JobRecord) => {
    localStorage.setItem(
      'jobHistory',
      JSON.stringify({
        favorites,
      })
    )
  }

  return (
    <JobContext.Provider
      value={{
        favorites,
        onAddRemoveToFavorites,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobHistoryProvider
