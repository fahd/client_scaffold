import styled from 'styled-components'

export const HomeWrapper = styled.div`
  flex: 1;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  width: 100%;
`

export const TodoCard = styled.div<{ offset: number; nested?: boolean }>`
  max-width: 500px;
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 0.05em;
  background: #fff;
  padding: 2em;
  height: 500px;
  text-align: center;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  z-index: ${({ offset }) => (offset === 0 ? 100 : 100 - offset / 30)};
  position: ${({ nested }) => (nested ? 'absolute' : 'relative')};
  top: ${({ offset }) => offset}px;
  left: ${({ offset }) => offset}px;

  &:hover {
    background: #f6f6f6;
  }
`

export const TodoCardPosition = styled.span`
  position: absolute;
  bottom: 2px;
  left: 5px;
  font-size: 16px;
`
