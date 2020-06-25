// import React, { Component } from 'react'
// import React, { useState } from 'react';


// a Node has a value, a pointer to the previous node (= prev), a pointer to the next node (= next)
class Node {
  constructor(id, todo, time) {
    this.id = id;
    
    this.todo = todo;
    this.time = time;

    this.next = null;
    this.prev = null
  }
}

// a Doubly Linked List has a length, a beginning (= head), an end (= tail)
class DoublyLinkedList {
  constructor() {
    // Needs to start at 3 due to the default values in the list being pre-rendered.
    this.count = 3;
    this.current=null;
    this.head = null;
    this.tail = null;
  }

  append(todo,time) {
    this.count++;
    const id = 'k' + this.count;
    const node = new Node(id,todo, time)
    if (!this.head) {
      this.current=node;
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
      this.current=node;
    }
    return id;
  }
  
  appendAt(pos, todo, time) {
    this.count++;
    const id1 = 'k' + this.count;
    let current = this.head;
    let counter = 1;
    const node1 = new Node(id1, time, todo);
    if (pos == 0) {
      this.head.prev = node1
      node1.next = this.head
      this.head = node1
    } else {
      while (current) {
        current = current.next;
        if (counter == pos) {
          node1.prev = current.prev
          current.prev.next = node1
          node1.next = current
          current.prev = node1
        }
        counter++
      }
    }
    return id1;
  }

  // findTodo(id) {
  //   if (id) {
  //     let current = this.head;
  //     let i = 0;
  //     while ((current !== null) && (i < index)) {
  //       current = current.next
  //       i++;
  //     }
  //     return current !== null ? current.data : undefined;
  //   } else {
  //     return undefined;
  //   }
  // }

  get() {
    return this.current;
  }

  // appendAfter(item) {
  //   // 
  // }

  //  Can we just removing item by clicking on 
  //  it in React by putting it in state?
  //  Or should we find it first?
  remove(id) {
    let current = this.head;
    while (current) {
      if (current.id === id) {
        // If there is only one node.
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.current = null;
          this.tail = null;
        // If the node being removed is the first node.
        } else if (current === this.head) {
          this.head = this.head.next
          this.head.prev = null
        // If the node being removed is the last node.
        } else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        // If the node is somewhere in the middle.
        // Will place the next node in its place,
        // and the previous node afterwards.
        // Essentially collapses the node element.
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      // Updates the node placement.
      current = current.next
    }
  }

  length() {
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      counter++
      current = current.next
    }
    return counter;
  }

  // display() {
  //   let current = this.head;
  //   let elements = [];
  //   while (current !== null) {
  //     elements.push(current.data);
  //     current = current.next
  //   }
  //   return elements.join(" ");
  // }

  isEmpty() {
    return this.length() < 1
  }

  search(id) {
    let current = this.head;
    let counter = 0;

    while (current) {
      if (current.id === id) {
        return counter
      }
      current = current.next
      counter++
    }
    return false;
  }

  nextNode() {
    if ((this.current) && (this.current !== this.tail)) {
      this.current = this.current.next;
      return this.current;
    }
    else if(this.current === this.tail) {
      // alert("you are at last item in todo list.")
      return this.tail;
    }
  }

  prevNode() {
    if ((this.current) && (this.current !== this.head)) {
      this.current = this.current.prev;
    return this.current;
    }
    else if (this.current === this.head) {
      // alert("you are at first item in todo list")
      return this.head;
    }
  }

}

export default { Node,DoublyLinkedList}
