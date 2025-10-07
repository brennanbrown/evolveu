import domfuncs from './dom'


test('Does the dom functions work?', () => {
    // expect(functions.add(1,2)).toBe(3);
    // expect(functions.add(101,202)).toBe(303);
    
    const element = domfuncs.buildCard();
    expect(element).toBeTruthy();
});


test('Does the addBefore functions work?', () => {
    // expect(functions.add(1,2)).toBe(3);
    // expect(functions.add(101,202)).toBe(303);
    const group = document.createElement("div");
    const element = domfuncs.buildCard("First Insert");
    group.appendChild(element);
    
    
    
    
    expect(group.children.length).toBe(1);
    
    const txt = 'New Element'
    domfuncs.addBefore(element, txt);
    expect(group.children.length).toBe(2);
    expect(group.children[0].textContent.substr(0,11)).toBe(txt);
    expect(group.children[1].textContent.substr(0,12)).toBe("First Insert");
    
});


test('Does the after functions work?', () => {
    // expect(functions.add(1,2)).toBe(3);
    // expect(functions.add(101,202)).toBe(303);
    const group = document.createElement("div");
    const element = domfuncs.buildCard("First Insert");
    group.appendChild(element);
    
    const second = domfuncs.buildCard("Second");
    
    element.after(second);
    // group.appendChild(second);
    
    let node = domfuncs.buildCard("one.one");
    
    second.before(node);
    
    
    
    
    
    
});

