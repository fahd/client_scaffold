import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { TodoProps } from "../../types";

const Todo: React.FC<TodoProps> = ({ task, assignee }) => {
  return (
    <div className="App__todo">
      <span>{assignee}</span>
      <span>{task}</span>
    </div>
  );
};

const AddTodo: React.FC = ({ newTodo, onAddTodo, updateNewTodo }) => {
  return (
    <div className="App__add-todo">
      <input
        value={newTodo}
        onChange={(e) => updateNewTodo(e.target.value)}
        type="value"
        placeholder="add task here"
      />
      <button onClick={onAddTodo}>Submit</button>
    </div>
  );
};

const App: React.FC = () => {
  const [count, setCount] = useState<number>(100);
  const [todos, updateTodos] = useState<TodoProps[]>([]);
  const [appData, updateData] = useState<string>("");
  const [newTodo, updateNewTodo] = useState<string>("");

  const onAddTodo = (): void => {
    console.log("newTodo", newTodo);
    axios
      .post("http://localhost:8080/api/create", {
        task: newTodo,
      })
      .then((response) => {
        const task = response.data[0];
        console.log("task", task);
        updateTodos((prev) => [...prev, task]);
        updateNewTodo("");
      })
      .catch((error) => {
        console.log(`Error in creating new Todo: ${error}`);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api")
      .then((response) => {
        const { data } = response;

        updateTodos((prevState) => data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <div className="App">
        <div className="App__items-container">
          {todos.length && (
            <div className="App__items">
              {todos.map((todo, idx) => (
                <Todo key={idx} {...todo} />
              ))}
            </div>
          )}
        </div>
        <div className="App__add-todo-container">
          <AddTodo
            onAddTodo={onAddTodo}
            newTodo={newTodo}
            updateNewTodo={updateNewTodo}
          />
        </div>
      </div>
    </>
  );
};

export default App;
