// Actual Linked List File
// See line 96 in LearnReact.js for TODO list for todo app.

// Note: Keep todo upper/lowercase consistent, and don't mix up todo with todoCard
// ie. function Todo({todo})

import React, { useState } from "react";
import "../../App.css";

// The main class.
class Node {
    // Takes arguments from each todo list card.
    constructor(index, time, todo) {
        this.index = index;
        this.time = time;
        this.todo = todo;
        
    }
    
}

// Essentially the controller class.
class LinkedList {
    constructor() {
        
        this.currentTodo = null;
        this.index = 0;
    }
    get() {
        return this.current;
    }
    insert(todo, time) {
        // Updates the counter.
        this.counter++;
        const id = 'p' + this.count;
        // Task is Todo Card
        const task = new Node(index,time,todo);
        
        if (this.current) { 
            task.nextNode = this.current.nextNode;
            task.nextNode.prevNode = task;

            this.current.nextNode = task;
            task.prevNode = this.current;

            this.current = task;
        } else {
            task.nextNode = task;
            task.prevNode = task;
            this.current = task;
        }
        return id;
    }
    // Show function
    show();
}