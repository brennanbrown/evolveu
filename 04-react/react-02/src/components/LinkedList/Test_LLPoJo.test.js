import funcs from './LLPoJo.js';


test('Our Plumbing', () => {
    console.log("Hello World!", funcs);
    
});
test('Our Node Class', () => {
    let node = new funcs.Node('k1',120,"Lets learn React");
    expect(node.id).toBe('k1');
    expect(node.time).toBe(120);
});

test('Our DoublyLinkedList Class', () => {
    const ourList = new funcs.DoublyLinkedList();
    expect(ourList.get()).toBeNull();

    let node;
    ourList.append(120, "Lets learn React");
    expect(ourList.get().id).toBe('k1');

    expect(ourList.nextNode().id).toBe('k1');
    expect(ourList.nextNode().id).toBe('k1');

    expect(ourList.prevNode().id).toBe('k1');
    expect(ourList.prevNode().id).toBe('k1');

    ourList.append(60, "Grocery shopping");
    expect(ourList.get().id).toBe('k2');

    expect(ourList.current.id).toBe('k2');
    expect(ourList.tail.id).toBe ('k2');
    
    
    expect(ourList.nextNode().id).toBe('k2');
    expect(ourList.prevNode().id).toBe('k1');

    

    ourList.append(180, "Driving to Edmonton");
    expect(ourList.get().id).toBe('k3');
    expect(ourList.nextNode().id).toBe('k3');
    expect(ourList.prevNode().id).toBe('k2');
    expect(ourList.prevNode().id).toBe('k1');
    expect(ourList.tail.id).toBe('k3')
    expect(ourList.current.id).toBe('k1');
    expect(ourList.head.id).toBe('k1');

    ourList.appendAt(0,30, "Going for a walk");
    expect(ourList.head.id).toBe('k4')
    expect(ourList.current.time).toBe(120)
    expect(ourList.current.todo).toBe('Lets learn React');
    expect(ourList.prevNode().id).toBe('k4');
    expect(ourList.head.id).toBe('k4');

    ourList.appendAt(2,45, "Cleaning the kitchen");
    expect(ourList.head.id).toBe('k4')
    expect(ourList.current.id).toBe('k4');
    expect(ourList.nextNode().id).toBe('k1');
    expect(ourList.nextNode().id).toBe('k5');
    expect(ourList.nextNode().id).toBe('k2');

    expect(ourList.search('k1')).toBe(1);
    expect(ourList.search('k4')).toBe(0);
    expect(ourList.search('k5')).toBe(2);
// k4,k1,k5,k2,k3
    ourList.remove('k5')
    expect(ourList.prevNode().id).toBe('k1');
    ourList.remove('k3')
    expect(ourList.tail.id).toBe('k2');
    ourList.remove('k2')
    ourList.remove('k1')
    ourList.remove('k4')
    expect(ourList.tail).toBe(null);
    expect(ourList.current).toBe(null);
    expect(ourList.isEmpty()).toBe(true);
    expect(ourList).toBeFalsy;
    expect(ourList.length()).toBe(0);
});

test('Testing X function within DoublyLinkedList', () => { 

});