import React, { useState, useRef, useEffect, useContext } from 'react'
import { Completed } from '../../components'
import { useHistory } from '../../hooks/useHistory'

import styled from 'styled-components'

// STYLING LOGIC
const LotteryWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  font-family: Helvetica Neue;
  align-items: center;
  position: relative;
`

const PlayContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  text-align: center;
`

const Instructions = styled.span`
  font-size: 16px;
`

const Button = styled.button`
  font-size: 26px;
  margin: 2em 0;
`
const ButtonValue = styled.div`
  font-size: 26px;
  text-align: center;
`

const Disclaimer = styled.div`
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`

// COMPONENT LOGIC
const Lottery: React.FC = () => {
  const { history, onAddGame } = useHistory()
  const [value, updateValue] = useState<number>(0)
  const [gameCompleted, updateGameCompleted] = useState<boolean>(false)

  // Determine type for interval
  const intervalRef = useRef<any>(null)

  const onGenerateNumbers = (): void => {
    intervalRef.current = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100000)
      updateValue(randomNumber)
    }, 100)

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        updateGameCompleted(true)
        intervalRef.current = null
      }
    }, 2000)
  }

  const onResetGame = (): void => {
    onAddGame(value, value > 0 && value < 1001)
    updateGameCompleted((prev) => false)
    updateValue((prev) => 0)
  }

  console.log('history', history)

  return (
    <LotteryWrapper>
      <Completed
        value={value}
        onResetGame={onResetGame}
        showModal={gameCompleted}
      />
      <PlayContainer>
        <Title>Lottery Selector</Title>
        <Instructions>Click the button below to generate a number</Instructions>
        <Button
          disabled={intervalRef.current != null}
          onClick={onGenerateNumbers}
        >
          Click to generate a number
        </Button>
        <ButtonValue>
          <span>Your Number: {value}</span>
        </ButtonValue>
        <Disclaimer>Any numer between 1 and 1000 wins!</Disclaimer>
      </PlayContainer>
    </LotteryWrapper>
  )
}

export default Lottery
