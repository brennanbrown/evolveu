//tests

mocha.setup('bdd');


var assert = chai.assert;

describe('Doubly Linked list', () => {

    it("should add the new node at the end", () => {

        const list = new DoublyLinkedList();
        list.push(1)
        list.push(2)
        list.push(3)
        list.push(4)

        assert.equal(4, list.length)

    })

    it("should remove the node at the end", () => {
        const list = new DoublyLinkedList();
        list.push("A")
        list.push("B")
        list.push("C")
        list.push("D")

        list.pop();
        list.pop();

        assert.equal(2, list.length)
        assert.equal("B", list.tail.data)
    })


    it("should insert the new node at the beginning", () => {
        const list = new DoublyLinkedList();
        list.push("C")
        list.push("D")
        list.insertBeginning("B");
        list.insertBeginning("A");


        assert.equal(4, list.length);
        assert.equal("A", list.head.data)

    })


    it("should remove the node at the beginning", () => {
        const list = new DoublyLinkedList();
        list.push("C")
        list.push("D")
        list.insertBeginning("B");
        list.insertBeginning("A");
        list.removeFirst()

        assert.equal(3, list.length);
        assert.equal("B", list.head.data)

    })

})