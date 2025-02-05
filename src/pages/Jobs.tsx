import { Link, useParams, useNavigate } from 'react-router-dom'
import { useJob } from '../hooks/useJob'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const JobContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  flex: 1;
`
const Posting = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`

const Company = styled(Title)`
  font-size: 24px;
  margin: 10px 0;
  padding-bottom: 10px;
`

const Description = styled.p`
  font-size: 18px;
  font-weight: semibold;
`

const PostingLeft = styled.div``
const PostingRight = styled.div`
  display: flex;
  align-items: center;
`

const Favorite = styled.div`
  font-size: 36px;
`

interface Job {
  job_id: number
  company_id: number
  company_name: string
  job_description: string
  job_title: string
}

const Job: React.FC = (props) => {
  const { id } = useParams<{ id: string }>()
  const [loading, updateLoading] = useState<boolean>(true)
  const [job, updateJob] = useState<Job | undefined>(undefined)
  const { favorites, onAddRemoveToFavorites } = useJob()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/${id}`)
      .then((response) => {
        const job = response.data

        updateJob(job)
        updateLoading(false)
      })
      .catch((e) => {
        navigate('/')
      })
  }, [favorites])

  const addRemoveToFavorites = () => {
    if (job) onAddRemoveToFavorites(job)
  }

  if (loading) {
    return <JobContainer>Loading</JobContainer>
  }
  if (job) {
    const hasFavorited = Boolean(favorites[job.job_id])

    return (
      <JobContainer>
        <Posting>
          <PostingLeft>
            <Title>{job.job_title}</Title>
            <Company>{job.company_name}</Company>
          </PostingLeft>
          <PostingRight>
            <Favorite onClick={addRemoveToFavorites}>
              {hasFavorited ? '❌' : '⭐️'}
            </Favorite>
          </PostingRight>
        </Posting>
        <Description>{job.job_description}</Description>
      </JobContainer>
    )
  }
}

export default Job
