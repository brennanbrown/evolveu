import React, { useState, useEffect } from 'react';
import LinkedList from './LLPoJo.js';
import "../../App.css";

/*  TODO:

    - Fix display so it works properly
    - Put current pointer into the state 
    - Add "remove" and "append" button functionality
    - Add newNode and currentNode components
    - Add button component

*/

function FormApp() {

    const todoLinkedList = new LinkedList.DoublyLinkedList();
    const todoNode = new LinkedList.Node();
    

    // Initial State
    const [task, setTask] = React.useState();
    const [operate, setOperate] = React.useState({ todo: "" });
    // const [time, setTime] = useState(0);
    // const [id, setId] = useState("");

    
    const onSaveNode = (task, time) => {
        todoLinkedList.append(task, time)
        // todoLinkedList.display()
        // setOperate(operate={todo:"null"})
        setOperate({ todo: null })
        //usestate should be here
    };

    const onClick = (e) => {
        const todo = e.target.getAttribute('todo');
        if (todo) {
            // console.log(todo);

            setOperate({ todo: todo });
            if (todo === 'save') {
                console.log("Do Save Stuff");
            } 
            else if (todo === 'cancel') {
                console.log("Do Save Stuff");
            } 
            // else if (todo === 'next') {
            //     this.pipeLine.next();
            // } else if (todo === 'prev') {
            //     this.pipeLine.prev();
            // }
        }
    };

    const getList = () => {
        return todoLinkedList;
    };

    const output= () => {
        
    };
    
    // How do display?
    const displayNode = () => {        
        // let current = this.head;
        // let elements = [];
        // while (current !== null) {
        //     elements.push(current.data);
        //     current = current.next
        // }
        // return elements.join(" ");
        const display = todoLinkedList.display();
        console.log(display)
        console.log(todoLinkedList.display());
    
    };

    const newNode = () => {
        // User inputs the task argument and the time argument
        // The key argument is automatically generated
        // with a counter loop.

        // Right now, it is hard-coded.
        let node = new LinkedList.Node("k1", 120, "Let's learn React");
        console.log(node);
        return node;
    }

    // const addTodo = (text,time) => {
    return (
        <div>
            <div>
                <input
                type="text"
                className="input"
                task={task}
                placeholder="enter a todo"
                onChange={e => setTask(e.target.task)}
                />
                    <button onClick={(() => onSaveNode()), (() => displayNode())}>save</button>
                    <button onClick={() => newNode()}>new</button>
                    {/* 
                    <button onClick={() => removeTodo(index)}>x</button>
                    <button onClick={() => appendTodo(index)}>+</button> 
                    */}
            </div>
        </div>
    );
}

export default FormApp