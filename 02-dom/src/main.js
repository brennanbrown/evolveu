// taxButton.addEventListener("click", function() {
// 	tax.innerHTML = "$" + taxFunc.taxCal(gross_income.value);
// });

add.addEventListener("click", function() { 
    let node = document.createElement("LI");
    // Create a <li> node
    let textnode = document.createTextNode("Water");
    // Create a text node
    node.appendChild(textnode);
    // Append the text to <li>
    document.getElementById("myList").appendChild(node);
    // Append <li> to <ul> with id="myList" 
});

remove.addEventListener("click", function() {
    let list = document.getElementById("myList");
    // Get the <ul> element with id="myList"
    // let childNodes = [];
    // for (let i = 0; i < childNodes.length; i++) {
    //     list.removeChild(list.childNodes[i]);
    // }
    list.removeChild(list.childNodes[0])
    
    // Remove <ul>'s first child node (index 0) 
});

show.addEventListener("click", function() {
    let list = document.getElementById("myList").textContent;
    let displayList = document.getElementById("displayList");
    displayList.textContent = list;
});

console.log("Success!")

buttonArray = [];

// function createButtons() {

//     if button = button[0]
//         add card after 
//     else if button = button[1]
//         add card before
//     else if button = button[2]
//         delete card after
//     else
//         delete card before
// }

// function createCards() {

//     createbuttons();
// }