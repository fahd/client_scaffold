import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Helvetica Neue;
	font-size: 18px;
	flex-direction: column;
}
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 24px;
`

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <LinksContainer>
        <Link to="/lottery">Hit the lottery</Link>
        <Link to="/style">Hit the Style</Link>
        <Link to="/history">History</Link>
      </LinksContainer>
    </HomeWrapper>
  )
}

export default Home
