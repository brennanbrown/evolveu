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

*/

function FormApp() {

    // Initalizes the functions of the Node constructor object.
    let node = new LinkedList.Node("k0", 120, "Let's learn React");

    // Initalizes the functions of the DoublyLinkedList object.
    const todoLinkedList = new LinkedList.DoublyLinkedList();
    
    // Initial State
    const [task, setTask] = useState("");
    const [time, setTime] = useState(0);
    const [operate, setOperate] = useState({ todo: "" });
    // const [time, setTime] = useState(0);
    // const [id, setId] = useState("");


    // Not needed?
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

    // Called "Save" even though it uses Append.
    const onSaveNode = (task, time) => {
        // Somehow get the return from: newNode();
        console.log("In the onSaveNode function.");
        // 
        todoLinkedList.append(task, time);
        // todoLinkedList.append("Driving to Edmonton", 180);
        // todoLinkedList.display()
        // setOperate(operate={todo:"null"})
        setOperate({ todo: null })
        // usestate should be here
        // const append = todoLinkedList.append();
        console.log(todoLinkedList);
    };

    // How do display?
    const displayNode = () => {     
        onSaveNode(task, time);
        console.log("In the displayNode function.");   
        
        const display = todoLinkedList.display();
        console.log(display)
        console.log(todoLinkedList.display());
    
    };

    const removeNode = (id) => {
        // Get ID (position) from User, how?
        todoLinkedList.remove(id);
        todoLinkedList.remove("k1");

        console.log(todoLinkedList);
    }

    const displayLengthNode = () => {
        onSaveNode(task, time);
        console.log("In the onSaveNode function.");

        let amount = todoLinkedList.length();

        console.log(amount);
    }

    return (
        <div>
            <div>

                {/* TODO: Add visual display of todoLinkedList here. */}

                <input
                    type="text"
                    className="input"
                    time={time}
                    placeholder="Enter estimated minutes here."
                    onChange={e => setTime(e.target.time)}
                />
                <input
                    type="text"
                    className="input"
                    task={task}
                    placeholder="Enter your task here."
                    onChange={e => setTask(e.target.task)}
                />
                <button onClick={() => onSaveNode()}>Create New Task</button>
                <button onClick={() => displayNode()}>Display Tasks</button>
                <button onClick={() => removeNode()}>Remove Task</button>
                <button onClick={() => displayLengthNode()}>Display # of Tasks</button>
                {/* 
                <button onClick={() => removeTodo(index)}>x</button>
                <button onClick={() => appendTodo(index)}>+</button> 
                */}

            </div>
        </div>
    );
}

export default FormApp