import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TodoProp, TodoProps } from '../../../typings'
import {
  HomeWrapper,
  TodoContainer,
  TodoCard,
  TodoCardPosition,
} from './Home.styles'

const OFFSET = 30

const Todo: React.FC<TodoProps> = (task) => {
  const { assignee_name, todo_id, todo, nested, offset, onSelectTodo } = task

  return (
    <TodoCard
      onClick={() => onSelectTodo(task)}
      nested={nested}
      offset={offset}
    >
      <i>"{todo}"</i>
      <span>-{assignee_name}</span>
      <TodoCardPosition>{todo_id}</TodoCardPosition>
    </TodoCard>
  )
}

const Home: React.FC = () => {
  const [todos, updateTodos] = useState<TodoProp[]>([])
  const [selectedTodo, updateSelectedTodo] = useState<TodoProp>()

  const onSelectTodo = (todo: TodoProp) => {
    updateSelectedTodo(todo)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api')
      .then((response) => {
        updateSelectedTodo(response.data[0])
        updateTodos(response.data)
      })
      .catch((error) => {
        console.log('Error fetching Home', error)
      })
  }, [])

  const filteredTodos = selectedTodo
    ? todos.filter((todo) => todo.todo_id !== selectedTodo.todo_id)
    : []

  return (
    <HomeWrapper>
      <TodoContainer>
        {selectedTodo && (
          <Todo
            {...selectedTodo}
            nested={false}
            onSelectTodo={onSelectTodo}
            key={selectedTodo.todo_id}
            offset={0}
          />
        )}
        {filteredTodos.map((todo, idx) => (
          <Todo
            {...todo}
            onSelectTodo={onSelectTodo}
            nested
            key={todo.todo_id}
            offset={(idx + 1) * OFFSET}
          />
        ))}
      </TodoContainer>
    </HomeWrapper>
  )
}

export default Home
