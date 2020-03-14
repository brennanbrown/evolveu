import domfuncs from './domfunc'


test('Does the dom functions work?', () => {
    // expect(functions.add(1,2)).toBe(3);
    // expect(functions.add(101,202)).toBe(303);
    console.log("We are in the tests");
    const element = domfuncs.buildCard();
    expect(element).toBeTruthy();
});


test('Does the addBefore functions work?', () => {
    // expect(functions.add(1,2)).toBe(3);
    // expect(functions.add(101,202)).toBe(303);
    
    // Creates a new .div in the HTML body.
    const group = document.createElement("div");

    // Creates a new card (from the function) within
    // the newly created .div
    const element = domfuncs.buildCard("First Insert");
    group.appendChild(element);
    
    // console.log(group);
    // console.log(group.children);
    // console.log(element.parentElement);
    
    // Tests to make sure that the element
    // was created within the group .div
    expect(group.children.length).toBe(1);

    // Create new text element.
    const txt = 'New Element'
    // Uses addBefore function to create a new card
    // with the 'txt' constant as the literal text
    // within the newly created card.
    domfuncs.addBefore(element, txt);

    // Tests to make sure the newly created element
    // is added to the group .div
    expect(group.children.length).toBe(2);
    

    expect(group.children[0].textContent.substr(0,11)).toBe(txt);
    
    
    expect(group.children[1].textContent.substr(0,12)).toBe("First Insert");

});