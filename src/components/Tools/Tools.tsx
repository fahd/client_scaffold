import React from 'react'
import styled from 'styled-components'

const CompletedWrapper = styled.div<{ showModal: boolean }>`
  width: 100%;
	height: 100%;
	background: rgba(200, 200, 200, 0.7);
	z-index: 100;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	backdrop-filter: blur(5px);
	display: ${(props) => (props.showModal ? 'flex' : 'none')}
}
`

const PlayCompleted = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Results = styled.div`
  max-width: 500px;
  max-height: 200px;
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ResultsTitle = styled.div`
  font-size: 18px;
`
const ResultsNumber = styled.div`
  margin: 20px 0;
  font-size: 24px;
`
const ResultsText = styled.div`
  font-size: 18px;
`
const ResultsActionContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  justify-content: flex-end;
`
const ResultsAction = styled.button`
  background: #969696;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  color: #fff;
  cursor: pointer;
`

export const Completed: React.FC<{
  value: number
  showModal: boolean
  onResetGame: () => void
}> = ({ value, onResetGame, showModal }) => {
  return (
    <CompletedWrapper showModal={showModal}>
      <PlayCompleted>
        <Results>
          <ResultsTitle>Result:</ResultsTitle>
          <ResultsNumber>{value}</ResultsNumber>
          <ResultsText>
            <span>
              {value > 0 && value < 1000
                ? 'Congrats, you won'
                : 'Sorry, you lost'}
            </span>
          </ResultsText>
          <ResultsActionContainer>
            <ResultsAction onClick={onResetGame}>OK</ResultsAction>
          </ResultsActionContainer>
        </Results>
      </PlayCompleted>
    </CompletedWrapper>
  )
}
