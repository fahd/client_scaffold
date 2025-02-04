import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const StyleWrapper = styled.div`
	flex: 1;
	display: flex;
	font-family: Helvetica Neue;
	font-size: 18px;
}
`

const Panes = styled.div`
  display: flex;
  flex: 1;
  justify-content: row;
`
const Pane = styled.div`
  flex: 1;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`
const PaneText = styled.div``

const Style: React.FC = () => {
  return (
    <StyleWrapper>
      <Panes>
        <Pane color={'white'}>
          <PaneText>1</PaneText>
        </Pane>
        <Pane color={'blue'}>
          <PaneText>2</PaneText>
        </Pane>
        <Pane color={'red'}>
          <PaneText>3</PaneText>
        </Pane>
      </Panes>
    </StyleWrapper>
  )
}

export default Style
