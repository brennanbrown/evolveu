/* ACTUAL LINKEDLIST FILE */

import React, { useState } from 'react';
import LinkedList from './LLPoJo.js';
import "../../App.css";

/*  TODO:

    June 26:
    - Fix display so it works properly
    - Put current pointer into the state 
    - Add "remove" and "append" button functionality
    - Add newNode and currentNode components
    - Add button component

    June 29:
    - Figure out setState for Time and Task.
        -> In order to grab Time and Task from User in <input>
    - Figure out how to get variable 'id' from User to delete task.
    - Modularize into separate functions.
        -> 1) LinkedListForm
        -> 2) CurrentList
        -> 3) App
    - Display array from displayNode();
    Note: Do not use <form>

*/


function LinkedListForm( { onSaveNode } ) {
    // Initial State
    const [task, setTask] = useState("");
    const [time, setTime] = useState(0);
    const [id, setID] = useState("");

    // const handleSubmit = e => {
    //   // preventDefault() prohibits default HTML 
    //   // form functions to break React.
    //   e.preventDefault();
    //   if ((!value)) return;
    //   // if ((!time)) return;
    //   addTodo(value);
    //   setValue("");
    //   setTime(0);
    // };

    const onClick = (e) => {
        const todo = e.target.getAttribute('todo');
        if (todo) {
            console.log(todo);

            // setOperate({ todo: todo });
            if (todo === 'save') {
                // Add functionality here.
                // handleSubmit(todo);
                onSaveNode(time,task);
                console.log("Do Save Stuff");
            } 
            else if (todo === 'delete') {
                console.log("Do Delete Stuff");
            } 
            // else if (todo === 'next') {
            //     this.pipeLine.next();
            // } else if (todo === 'prev') {
            //     this.pipeLine.prev();
            // }
        }
    };

    // const handleSubmit = e => {
    //     // preventDefault() prohibits default HTML 
    //     // form functions to break React.
    //     e.preventDefault();
    //     if ((!task)) return;
    //     if ((!time)) return;
    //     onSaveNode(task,time);
    //     setTask("");
    //     setTime(0);
    //     console.log(e);
    // };
    
    return(
        <div onClick={onClick}>
            <input
                type="text"
                className="input"
                time={time}
                placeholder="Enter estimated minutes here."
                onChange={e => setTime(e.target.value)}
            />
            <input
                type="text"
                className="input"
                task={task}
                placeholder="Enter your task here."
                onChange={e => setTask(e.target.value)}
            />
            <button todo="save" >Create New Task</button>
        </div>
    )


// PLACEHOLDER:
    // const [time, setTime] = useState(0);
    // const [id, setId] = useState("");

//     const [value, setValue] = useState("");
//     const [time, setTime] = useState(0);
//     const [id, setID] = useState("");
//     const [x, setX] = useState();
  
//     const handleSubmit = e => {
//       // preventDefault() prohibits default HTML 
//       // form functions to break React.
//       e.preventDefault();
//       if ((!value)) return;
//       // if ((!time)) return;
//       addTodo(value,time);
//       setValue("");
//       setTime(0);
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <div className="inputTodo">
//           <input
//             type="text"
//             className="input"
//             value={value}
//             placeholder="enter a todo"
//             onChange={e => setValue(e.target.value)}
//           />
//           <input
//             type="number"
//             className="input"
//             time={time}
//             placeholder="enter time"
//             onChange={e => setValue(e.target.time)}
//           />
//         </div>
//       </form>
      
//     );
//   }
}

// Controller Class ?
// ListController () {

// }

function currentList(task, time) {
    return (
        <div className="todo" /* style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} */ >
            
            {this.task}

            {this.time}

            <div>
            {/* <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => removeTodo(index)}>x</button>
            <button onClick={() => appendTodo(index)}>+</button> */}
            </div>
        </div>
        );
}

function App() {
    
    // Initalizes the functions of the DoublyLinkedList object.
    const [todoLinkedList, setTodoLinkedList] = useState ( new LinkedList.DoublyLinkedList());

    // const [operate, setOperate] = useState({ todo: "" });

    // Called "Save" even though it uses Append.
    const onSaveNode = (task, time) => {
        // Somehow get the return from: newNode();
        console.log("In the onSaveNode function.");
        // 
        // setTodoLinkedList (todoLinkedList.append(task, time));
        todoLinkedList.append(task, time);
        
        // todoLinkedList.append("Driving to Edmonton", 180);
        // todoLinkedList.display()
        // setOperate(operate={todo:"null"})
        // setOperate({ todo: null })
        // usestate should be here
        // const append = todoLinkedList.append();
        console.log(todoLinkedList);
    };

    // How do display?
    const displayNode = () => {     
        // onSaveNode(task, time);

        // State Problem?
        
        console.log("In the displayNode function.");   
        
        const display = todoLinkedList.display();
        let size = display.length;
        for (let i=0; i < size; i++) {
            display.push(<currentList 
                
            />);
        }
        console.log(display)
        console.log(todoLinkedList.display());
        return display;
    
    };

    const removeNode = (id) => {
        // Get ID (position) from User, how?
        todoLinkedList.remove(id);
        todoLinkedList.remove("k1");

        console.log(todoLinkedList);
    };

    const displayLengthNode = () => {
        // onSaveNode(task, time);
        console.log("In the onSaveNode function.");

        let amount = todoLinkedList.length();

        console.log(amount);
    };

    // function TaskList() {
    //     const tasks = displayNode();
    //     <ol>
    //                 {tasks.map(task => <li>{task}</li>)}
    //     </ol>
    //     return tasks;
    // };

    return (
        <div>
            <div>

                <h2>List of To-dos:</h2>
                <div>
                {/* TODO: Display array from displayNode(); */}
                <currentList />

                {/* {displayNode((task) => (
                    <li>{task}</li>
                    // <currentList
                    //     key={task}
                        // index={task}
                        // todo={todo}
                        // Add time here
                        // time = {time}
                        // completeTodo={completeTodo}
                        // removeTodo={removeTodo}
                        // appendTodo={appendTodo}
                
                ))} */}
                </div>
                

                {/* TODO: Add visual display of LinkedListForm here. */}
                < LinkedListForm onSaveNode={onSaveNode}/>
                {/* <button onClick={() => onSaveNode()}>Create New Task</button> */}
                <button onClick={() => displayNode()}>Display Tasks</button>
                <button onClick={() => removeNode()}>Remove Task</button>
                <button onClick={() => displayLengthNode()}>Display # of Tasks</button>


            </div>
        </div>
    );
}

export default App;