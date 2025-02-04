import React from 'react'
import { useHistory } from '../../hooks/useHistory'
import styled from 'styled-components'

const Record = styled.div`
  display: flex;
`
const RecordScore = styled.div``
const RecordWon = styled.div`
  margin-left: 5px;
`

const History: React.FC = () => {
  const { history } = useHistory()

  const onRenderHistory = () => {
    console.log('history here', history)
    return history.map((record, idx) => (
      <Record key={idx}>
        <RecordScore>{record.number}</RecordScore>
        <RecordWon>{record.won.toString()}</RecordWon>
      </Record>
    ))
  }
  return <>{onRenderHistory()}</>
}

export default History
