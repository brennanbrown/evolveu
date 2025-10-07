// import React, { Component } from "react"
// import React, { useState } from "react";


// a Node has a value, a pointer to the previous node (= prev), a pointer to the next node (= next)
class Node {
    constructor(id, time, todo) {
        this.id = id;
        this.time = time;
        this.todo = todo;
        this.next = null;
        this.prev = null;
    }
}

// a Doubly Linked List has a length, a beginning (= head), an end (= tail)
class DoublyLinkedList {

    constructor() {
        this.count = 0;
        this.current = null;
        this.head = null;
        this.tail = null;
    }

    append(time, todo) {
        this.count++;
        const id = "k" + this.count;
        const node = new Node(id, time, todo);
        if (!this.head) {
            this.current = node;
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
            this.current = node;
        }
        return id;
    }

    appendAt(pos, todo, time) {
        this.count++;
        const id1 = "k" + this.count;
        let current = this.head;
        let counter = 1;
        const node1 = new Node(id1, time, todo);
        if (pos === 0) {
            this.head.prev = node1;
            node1.next = this.head;
            this.head = node1;
        } else {
            while (current) {
                current = current.next;
                if (counter === pos) {
                    node1.prev = current.prev;
                    current.prev.next = node1;
                    node1.next = current;
                    current.prev = node1;
                }
                counter++;
            }
        }
        return id1;
    }

    get() {
        if (this.head === null) {
            return "(Currently Empty)";
        } else {
            return this.current;
        }
    }

    gethead() {
        if (this.head == null) {
            return "(Currently Empty)";
        } else {
            let current = this.head;
            return (current.todo);
        }
    }

    gettail() {
        if (this.tail == null) {
            return "(Currently Empty)";
        } else {
            let current = this.tail;
            return (current.todo);
        }
    }

    remove(id) {
        // If id is provided, find and remove that specific node
        if (id) {
            let current = this.head;
            while (current) {
                if (current.id === id) {
                    // Found the node to remove
                    if (current === this.head && current === this.tail) {
                        // Only one node
                        this.head = null;
                        this.tail = null;
                        this.current = null;
                    } else if (current === this.head) {
                        // Remove head
                        this.head = this.head.next;
                        this.head.prev = null;
                        if (this.current === current) {
                            this.current = this.head;
                        }
                    } else if (current === this.tail) {
                        // Remove tail
                        this.tail = this.tail.prev;
                        this.tail.next = null;
                        if (this.current === current) {
                            this.current = this.tail;
                        }
                    } else {
                        // Remove middle node
                        current.prev.next = current.next;
                        current.next.prev = current.prev;
                        if (this.current === current) {
                            this.current = current.next;
                        }
                    }
                    this.count--;
                    return true;
                }
                current = current.next;
            }
            return false;
        }
        
        // Original remove logic for current node
        if(!this.head) {return null;}
        else if (this.length() === 1){
            this.head = null;
            this.tail = null;
            this.current = null;
            return null;
        }
        else if (this.length() > 1){ 
            if (this.current === this.head) {
                this.head = this.head.next;
                this.current = this.head.next;
                this.head.prev = null;
            } else if (this.current === this.tail) {
                this.tail = this.tail.prev;
                this.current = this.tail;
                this.tail.next = null;
            } else {
                this.current.prev.next = this.current.next;
                this.current.next.prev = this.current.prev;
                this.current = this.current.next;
            }
            return this.current.todo;
        }
    }

    length() {
        let current = this.head;
        let count = 0;
        if (current === null) return count;
        else{
            while (current !== null) {
                count++;
                current = current.next;
            }
        }
        return count;
    }

    total(){
        let current = this.head;
        let total = Number(0);
        if (current === null) return total;
        else {
            while (current !== null) {
                total = Number(current.time) + Number(total);
                current = current.next;
            }
            return total;
        }
    }

    display() {
        let current = this.head;
        let elements = [];
        while (current !== null) {
            elements.push([current.id, current.todo ,current.time]);
            current = current.next;
        }
        return elements;
    }

    isEmpty() {
        return this.length() < 1;
    }

    search(id) {
        let current = this.head;
        let counter = 0;
        while (current) {
            if (current.id === id) {
                return counter;
            }
            current = current.next;
            counter++;
        }
        return false;
    }

    nextNode() {
        if (this.tail == null) {
            return "(Currently Empty)";
        }
        else if ((this.current) && (this.current !== this.tail)) {
            this.current = this.current.next;
            return this.current;
        }
        else  {
            return this.current;
        }
    }

    prevNode() {
        if (this.head == null) {
            return "(Currently Empty)";
        }
        else if ((this.current) && (this.current !== this.head)) {
            this.current = this.current.prev;
            return this.current;
        }
        else if (this.current === this.head) {
            return this.current;
        }
    }
}

export default { Node,DoublyLinkedList};
