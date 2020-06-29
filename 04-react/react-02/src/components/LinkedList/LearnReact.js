import React, { useState } from "react";
import LinkedList from './LLPoJo.js';
import "../../App.css";

let x = new LinkedList.DoublyLinkedList();

// Note: Plus button currently does not have any functionality.
// Note: You MUST call functions as arguments.
function Todo({todo, time, index, completeTodo, removeTodo, appendTodo }) {
  return (
    <div
    
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      {todo.time}

      <div>
        
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
        <button onClick={() => appendTodo(index)}>+</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const [time, setTime] = useState(0);
  const [id, setID] = useState("");
  const [x, setX] = useState();

  const handleSubmit = e => {
    // preventDefault() prohibits default HTML 
    // form functions to break React.
    e.preventDefault();
    if ((!value)) return;
    // if ((!time)) return;
    addTodo(value,time);
    setValue("");
    setTime(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputTodo">
        <input
          type="text"
          className="input"
          value={value}
          placeholder="enter a todo"
          onChange={e => setValue(e.target.value)}
        />
        <input
          type="number"
          className="input"
          time={time}
          placeholder="enter time"
          onChange={e => setValue(e.target.time)}
        />
      </div>
    </form>
    
  );
}

/* ANDREW'S TIME INPUT:

      <div className="inputTime">
        <input
          type="number"
          className="input"
          value={time}
          placeholder="enter time"
          onChange={e => setValue(e.target.time)}
        />

*/

function App() {
  // Default to-do list items.
  const [todos, setTodos] = useState([
    {

      newid: "k1",
      text: "Learn about React",
      isCompleted: false,
      time: "30"
    },
    {
      newid: "k2",
      text: "Meet team on Discord",
      isCompleted: false,
      time: "20"
    },
    {
      newid: "k3",
      text: "Discuss the requirements",
      isCompleted: false,
      time: "10"
    }
  ]);

  const addTodo = (text,time) => {
    const newid= x.append (text, time)
    const newTodos = [...todos, {newid,text,time}]
    // Replace with something like x.append();
    console.log(newTodos);
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // x.remove(newTodos);
  };

  const appendTodo = index => {
    // You would call the function from LLPoJo.js here
    // Eg. LinkedList.append();
    return null;
  };

  /* TODO:
    - Important: Convert todo array into linked list.
    - DONE: Add a plus button to each of the cards
    - Pass a time amount (number value - minutes)
    - Display a total of all amounts (Eg. all minutes)
    - Figure out how to properly define Time !!
  */

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            // Add time here
            // time = {time}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            appendTodo={appendTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
