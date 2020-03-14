
import domfuncs from './domfunc.js'

console.log(idButton);

let counter = 0;

document.body.addEventListener("click", e => {
    // console.log("You Clicked, at your command");
    console.log(e.target.textContent);
    console.log(e.target.nodeName);
    console.log(e.target);

    if (e.target.nodeName === 'BUTTON') {
        // document.body.appendChild(domfuncs.buildCard("You just added " + counter++));
        // console.log(e.target.textContent);
        if (e.target.textContent === "Before") {
            var list = document.getElementById(list);
            console.log(list);        
        }
        if (e.target.textContent === "After") {
            var list = document.getElementById(list);
            console.log(list);        
        }
        
    }

   
    
    

    // const div = document.createElement("div");
    // div.className = "clCard";
    // div.appendChild(document.createTextNode("This has been inserted"));

    // idStuff2.insertAdjacentElement("afterend", div);


})

console.log(idStuff2);



