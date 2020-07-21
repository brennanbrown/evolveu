

document.body.addEventListener("click", myEventListener);

// "e" is event bubbling. 
function myEventListener(e) {
    const el = e.target;
    const myAttr = el.getAttribute("myAttr");
    
    if (myAttr) {
        el.textContent = el.textContent + " 123";
    }
}