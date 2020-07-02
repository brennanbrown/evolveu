// import React, { Component } from 'react'
// import React, { useState } from 'react';


// a Node has a value, a pointer to the previous node (= prev), a pointer to the next node (= next)
class Node {
  constructor(id, time, todo) {
    this.id = id;
    
    
    this.time = time;
    this.todo = todo;

    this.next = null;
    this.prev = null
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
    // console.log(this.current);
   if (this.head === null) {
     console.log("This is an empty!");
     return "null";
   } else {
    console.log(this.current.todo)
    return this.current.todo;
   }
  }
  gethead() {
    // console.log(this.current);
   if (this.head == null) {
     console.log("This is an empty!");
     return "Null";
   } else {
     let current =this.head
    return (current.todo);
   }
  }
  // appendAfter(item) {
  //   // 
  // }
  gettail() {
    // console.log(this.current);
   if (this.tail == null) {
     console.log("This is an empty!");
     return "Null";
   } else {
     let current =this.tail
    return (current.todo);
   }
  }
  // appendAfter(item) {
  //   // 
  // }
  //  Can we just removing item by clicking on 
  //  it in React by putting it in state?
  //  Or should we find it first?
  remove() {
    // if (this.length() ===0) {
    //   alert("All Tasks are done")
    //   return null}
    if(!this.head) {return null}
    else if (this.length()===1){
      console.log(this.length())
     alert ("last task is removed")
      // single node  so we assign head and tail to null
        this.head= null
        this.tail = null
        this.current= null
        return null
      }
    else if (this.length()>1){ 
        // If the node being removed is the first node.
        if (this.current === this.head) {
          this.head = this.head.next
          this.current=this.head.next
          
          this.head.prev = null
         
        // If the node being removed is the last node.
        } else if (this.current === this.tail) {
          console.log(this.length())
          this.tail = this.tail.prev;
          this.current=this.tail
          this.tail.next = null;
      
        }else{
          
         this.current.prev.next = this.current.next;
        this.current.next.prev = this.current.prev;
        this.current=this.current.next;
        }
      
     
      console.log(this.current)
      return this.current.todo
     }
    }
  

  length() {
    
    let current = this.head;
    let count = 0;
    if (current===null) return count;
    else{
    while (current !== null) {
      count++
      current = current.next
    }
  }
    return count;
  }
  total(){
    let current = this.head;
    let total = Number(0);
    if (current===null) return total;
    else{
    while (current !== null) {
      total=Number(current.time)+Number(total)
      current = current.next
    }
    return total
  }
}

  display() {
    let current = this.head;
    let elements = [];
    while (current !== null) {
      elements.push([current.id, current.todo ,current.time]);
      // elements.push({id:current.id, task:current.todo, time:current.time})
      // elements.push({id:current.id, tasktime:current.todo +current.time})
      current = current.next
    }
    console.log(elements);
    return elements;
    // return elements.join(" ");
  }
  // display() {
  //   let current = this.head;
  //   let elements = [];
  //   // let br = document.createElement("br");
  //   while (current !== null) {
  // //     elements.push(
  //   <currentList 
    
    // current.todo + " Estimated Time: " + current.time + " Minutes.");
  //     current = current.next
  //   }
  //   return elements;
  //   // return elements.join(" ");
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
    if (this.tail == null) {
      return "Null";
    }
    else if ((this.current) && (this.current !== this.tail)) {
    console.log(this.current);
    console.log(this.tail);
      this.current=this.current.next
      console.log(this.current);
      return "Null";
    }
          else  {
         
            
            // alert("you are at last item in todo list.")
            return "Null";
          }
  }

  prevNode() {
    if (this.head == null) {
      return "Null";
    }
    else if ((this.current) && (this.current !== this.head)) {
      this.current = this.current.prev;
      console.log(this.current)
    return this.current.todo;
    }
    else if (this.current === this.head) {
      // alert("you are at first item in todo list")
      return "Null";
    }
  }

}

export default { Node,DoublyLinkedList}
