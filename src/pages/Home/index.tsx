import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import { TodoProps } from '../../../typings'
const OFFSET = 30
const Todo: React.FC<TodoProps> = (task) => {
  const {
    assignee_id,
    todo_id,
    assignee_name,
    todo,
    nested,
    offset,
    onSelectTodo,
  } = task

  return (
    <div
      onClick={() => onSelectTodo(task)}
      className={`Home__todoCard ${
        nested ? 'Home__todoCard-nested' : 'Home__todoCard-main'
      }`}
      style={{
        top: `${offset}px`,
        left: `${offset}px`,
        zIndex: `${offset === 0 ? '100' : `${100 - offset / OFFSET}`}`,
      }}
    >
      <i>"{todo}"</i>
      <span>-{assignee_name}</span>
      <span className="Home__todoCardPosition">{todo_id}</span>
    </div>
  )
}

const Home: React.FC = () => {
  const [todos, updateTodos] = useState<TodoProps[]>([])
  const [selectedTodo, updateSelectedTodo] = useState<TodoProps>()

  const onSelectTodo = (todo: TodoProps) => {
    updateSelectedTodo((prev) => todo)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api')
      .then((response) => {
        updateSelectedTodo(response.data[0])
        updateTodos((prev) => [...response.data])
      })
      .catch((error) => {
        console.log('Error fetching Home', error)
      })
  }, [])

  let filteredTodos

  if (selectedTodo) {
    filteredTodos = todos.filter(
      (todo) => todo.todo_id !== selectedTodo.todo_id
    )
  }

  return (
    <div className="Home">
      <div className="Home__todoContainer">
        <div className="Home__todoMain">
          {selectedTodo && (
            <Todo
              {...selectedTodo}
              nested={false}
              onSelectTodo={onSelectTodo}
              key={selectedTodo.todo_id}
              offset={0}
            />
          )}
          {filteredTodos &&
            filteredTodos.map((todo, idx) => (
              <Todo
                {...todo}
                onSelectTodo={onSelectTodo}
                nested
                key={todo.todo_id}
                offset={(idx + 1) * OFFSET}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
