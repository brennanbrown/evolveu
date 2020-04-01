console.log("Hello from index.js");

document.body.addEventListener("click", myEventListener);

// "e" is event bubbling. 
function myEventListener(e) {
    const el = e.target;
    const myAttr = el.getAttribute("myAttr");
    console.log("I'm in my event listener!", el, el.textContent, myAttr);
    if (myAttr) {
        el.textContent = el.textContent + " 123";
    }
}