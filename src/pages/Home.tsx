import { useNavigator, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useBoard } from '../hooks/useBoard'
import { default as s } from 'styled-components'

const HomeContainer = s.div`
	flex: 1;
  max-width: 1080x;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Board = s.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-wrap:wrap;
`

const Piece = s.div`
  width: 33%;
  height: 33%;
  display:flex;
  justify-content: center;
  align-items:center;
  border: 1px solid #333;
`

const Home: React.FC = () => {
  const { board, onUpdateBoard } = useBoard()
  const [piece, updatePiece] = useState<string>('X')

  const renderPieces = () => {
    return board.map((value, i) => {
      //
      return (
        <Piece onClick={() => onSelectPiece(i)} key={i}>
          {value}
        </Piece>
      )
    })
  }

  const onSelectPiece = (idx: number) => {
    if (board[idx].length > 0) {
      alert('There is already a piece here')
    } else {
      const newPiece = piece === 'X' ? 'O' : 'X'
      onUpdateBoard(idx, newPiece)
      updatePiece(newPiece)
    }
  }

  const checkWinner = () => {
    const winnerToCheck = piece
    const vertical = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ]

    const horizontal = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]

    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ]

    console.log('winnerTochec', winnerToCheck)

    vertical.forEach((positions, i) => {
      const [p1, p2, p3] = positions
      if (
        board[p1] === winnerToCheck &&
        board[p2] === winnerToCheck &&
        board[p3] === winnerToCheck
      ) {
        console.log(`Winner Vertical: ${piece}`)
      }
    })
    horizontal.forEach((positions, i) => {
      const [p1, p2, p3] = positions
      if (
        board[p1] === winnerToCheck &&
        board[p2] === winnerToCheck &&
        board[p3] === winnerToCheck
      ) {
        console.log(`Winner Horizontal: ${piece}`)
      }
    })
    diagonal.forEach((positions, i) => {
      const [p1, p2, p3] = positions
      if (
        board[p1] === winnerToCheck &&
        board[p2] === winnerToCheck &&
        board[p3] === winnerToCheck
      ) {
        console.log(`Winner Diagonal: ${piece}`)
      }
    })
  }

  useEffect(() => {
    checkWinner()
  }, [board])

  return (
    <HomeContainer>
      <Board>{renderPieces()}</Board>
    </HomeContainer>
  )
}

export default Home
