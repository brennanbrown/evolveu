/* ACTUAL LINKEDLIST FILE */

/* IMPORTANT: 

If you try to update the state within the same app,
add: const [counter, setCounter] = useState(0);
in order to auto-update! (For debugging only.)
*/

import React, { useState, useEffect } from "react";
import LinkedList from "./LLPoJo.js";
import "../../App.css";

function LinkedListForm({ onSaveNode, todoLinkedList,onPrevNode, onNextNode, onRemoveNode }) {
    // Initial State
    const [task, setTask] = useState("");
    const [time, setTime] = useState(0);
    const onClick = (e) => {
        const todo = e.target.getAttribute("todo");
        if (todo) {
      
            if (todo === "save") {
                onSaveNode(time, task);
        
            } else if (todo === "prev") {
                onPrevNode();
        
            }
      
            else if(todo ==="next"){
                onNextNode();
        
            }
      
            else if (todo === "delete") {
                onRemoveNode();
        
            }
        }
    };
  
    return (
        <div onClick={onClick}><br/>
            <p>Time for Task:</p>
            <input
                type="text"
                className="input"
                time={time}
                placeholder="Enter estimated minutes here."
                onChange={(e) => setTime(e.target.value)}
            /><br/>
            <p>Task Name:</p>
            <input
                type="text"
                className="input"
                task={task}
                placeholder="Enter your task here."
                onChange={(e) => setTask(e.target.value)}
            /><br/>
            <br/><button todo="save">Create New Task</button><br/>
            <button todo="delete">Remove Current Task</button><br/><br/>
            <button  todo="prev"> {"<=="} Previous Task</button>
            <button todo="next"> {"==>"} Next Task</button>
        </div>
    );
}

function App() {
    // For debugging only!
    // Initalizes the functions of the DoublyLinkedList object.
    const [counter, setCounter] = useState(0);
    const [todo, setTodo]=useState("");
  
    // Will currently noit update the state, since it"s
    // within the app itself.
    const [todoLinkedList, setTodoLinkedList] = useState( new LinkedList.DoublyLinkedList() );
    useEffect(() => { onPrevNode(); }, [todo==="prev"]);
    
    // Called "Save" even though it uses Append.
    const onSaveNode = (task, time) => {
        todoLinkedList.append(task, time);
        setTodoLinkedList(todoLinkedList);
        // This counter is set in state and used to override React"s default override:
        setCounter(counter + 1);
    };

    const onPrevNode=() =>{
        let current=  todoLinkedList.prevNode();
        setCounter(counter + 1);
        return current;
    };
    
    const onNextNode=() =>{
        let current=  todoLinkedList.nextNode();
        setCounter(counter + 1);
        return current;
    };

    const onRemoveNode =() =>{
        todoLinkedList.remove();
        setCounter(counter+1);
    };

    const DisplayNode = () => {
        const display = todoLinkedList.display();
        return display;
    };
    
    const removeNode = (id) => {
        todoLinkedList.remove(id);
        todoLinkedList.remove("k1");
      
    };
    
    const displayLengthNode = () => {
        let amount = todoLinkedList.length();
    };
    
    return (
        <div style={{textAlign: "center"}}>
            <div className="app" style={{textAlign: "center"},{display: "inline-block"}}>
                <div className="todo-list">
                    <div className="todo">
                        <h2>List of To-dos:</h2><br/>
                    </div>
                    <ol>
                        {todoLinkedList.display().map((task) => (
                            <li>{task[1]} - {task[2]} minutes </li> 
                        ))}
                    </ol>
                </div>
                <div className="todo-list" >
                    <h3> Current: {todoLinkedList.get()} </h3>
                    <h3> Head: {todoLinkedList.gethead()} </h3>
                    <h3> Tail: {todoLinkedList.gettail()} </h3>
                    <h4> Total time (min) to do everything: {todoLinkedList.total()} </h4> 
                </div>
            </div>
        
            <LinkedListForm onSaveNode={onSaveNode}  onPrevNode={onPrevNode} onNextNode={onNextNode} onRemoveNode={onRemoveNode}/>
        </div>
    );
}
    
export default App;
