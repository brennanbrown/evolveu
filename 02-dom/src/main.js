import dom from './dom.js'

let counter = 4;

add.addEventListener("click", function() { 
    let node = document.createElement("LI");
    let textnode = document.createTextNode("Item " + counter++);
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
});

remove.addEventListener("click", function() {
    myList.removeChild(myList.childNodes[0])
});

show.addEventListener("click", function() {
    idDisplayList.textContent = myList.textContent;
});

console.log("Success!")

let cardCounter = 2;

document.body.addEventListener("click", e => {
    
    if (e.target.nodeName === 'BUTTON') {
        console.log(e.target.textContent);
        
        if (e.target.textContent === "Add After") {
            dom.addAfter(e.target.parentElement, "Card " + cardCounter++);
        }
        if (e.target.textContent === "Add Before") {
            dom.addBefore(e.target.parentElement, "Card " + cardCounter++);
        }
        if (e.target.textContent === "Delete") {
            dom.deleteCard(e.target.parentElement);
        }
        
    }
    
});