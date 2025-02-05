import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useJob } from '../hooks/useJob'
import styled from 'styled-components'
import axios from 'axios'

const HomeContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 25px 0;
  flex: 1;
`
const JobPostingsContainer = styled.div``
const JobPostingsTitle = styled.h2``
const FavoritesContainer = styled.div``

const FavoritesTitle = styled.h2``

const JobPostings = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Posting = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #ececec;
  border-radius: 0.25em;
  text-decoration: none !important;
  color: #333;
`

const Company = styled.div`
  margin: 10px 0;
  font-size: 20px;
`
const JobTitle = styled.div`
  font-size: 24px;
`
const JobDescription = styled.div`
  font-size: 18px;
`

const Job = styled.div``

interface Job {
  job_id: number
  job_description: string
  job_title: string
  company_id: number
  company_name: string
}

const Home: React.FC = () => {
  const [jobs, updateJobs] = useState<Job[]>([])
  const { favorites } = useJob()

  useEffect(() => {
    axios.get('http://localhost:8080/api').then((response) => {
      const jobs = response.data
      updateJobs(jobs)
    })
  })

  const renderJobs = () => {
    return jobs.map((job: Job, idx) => {
      return (
        <Link to={`/jobs/${job.job_id}`}>
          <Posting key={job.job_id}>
            <JobTitle>{job.job_title}</JobTitle>
            <Company>{job.company_name}</Company>
            <JobDescription>
              <span></span>
              {job.job_description}
            </JobDescription>
          </Posting>
        </Link>
      )
    })
  }

  const jobsFound = jobs.length > 0

  return (
    <HomeContainer>
      <JobPostingsContainer>
        <JobPostingsTitle>Postings</JobPostingsTitle>
        <JobPostings>{jobsFound && renderJobs()}</JobPostings>
      </JobPostingsContainer>
      <br />
      <hr />
      <FavoritesContainer>
        <FavoritesTitle>Favorites</FavoritesTitle>
        <div>
          <pre>
            <code>{JSON.stringify(favorites)}</code>
          </pre>
        </div>
      </FavoritesContainer>
    </HomeContainer>
  )
}

export default Home
