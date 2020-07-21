import pfunc from "./play.js"

test("Testing the plumbing", () => {
    
    expect(123).toBe(123);
});

test("Testing to demonstrate arrays.", () => {
    const array = [1,2,3];
    expect(array.length).toBe(3);
    expect(array[1]).toBe(2);

    array.push(12);
    expect(array.length).toBe(4);
    expect(array[3]).toBe(12);

    array.unshift(15);

    array.forEach( (val, i, arr) => {
        
    });
});

test("Testing to demonstrate dictionaries.", () => {
    const obj1 = {ab:"Alberta", sk:"Saskatchewan"};
    
    obj1["mn"] = "Manitoba";
    

    for (let v in obj1) {
        
    }
});

test("Testing the link to play.js", () => {
    
    const retval = pfunc.play(123);
    expect(retval[0]).toBe(123);
    
    expect(pfunc.play(234)[0]).toBe(234);
});

test("Testing complex data structures.", () => {
    const obj2 = {
        ab:"Alberta", 
        sk:"Saskatchewan"
    };

    const city = {
        yyc:"Calgary",
        yeg:"Edmonton",
        yvr:"Vancouver"
    };

    obj2["city"] = city;

    
});

test ("Does the first DOM function work?", () => {
    const div = document.createElement("div");
    let text = document.createTextNode("First");
    
    div.appendChild(document.createTextNode(text));
    const div2 = document.createElement("div");
    
    div.append(div2);

    
    
});

test ("Does the second DOM function work?", () => {
    const group = document.createElement("div");

    let div, txt;

    div = document.createElement("div");
    txt = document.createTextNode("First");

    div.append(txt);
    group.append(div);

    div = document.createElement("div");
    txt = document.createTextNode("Second");

    div.append(txt);
    group.append(div);

    

});