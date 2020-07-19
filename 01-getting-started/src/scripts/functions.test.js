// Imports functions.js to test from.
import functions from './functions'

test('Check the sizes', () => {
    // Goes through the returned result of each
    // parameter that is tested here.
    expect(functions.size(-1)).toBe("negative"); // Consider the edge cases
    expect(functions.size(0)).toBe("small");
    expect(functions.size(10)).toBe("medium");
    expect(functions.size(15)).toBe("medium");
    expect(functions.size(20)).toBe("large");
    expect(functions.size(2000000)).toBe("very large");
});

test('Does that add function work?', () => {	
    expect(functions.add(1,2)).toBe(3);
    expect(functions.add(101,202)).toBe(303);
    expect(functions.subtract(403,33)).toBe(370);
    expect(functions.divide(133,11)).toBe(12);
    expect(functions.multiply(9,13)).toBe(117);
    expect(functions.largerNumber(234,235)).toBe(235);
    expect(functions.powerOf(7,3)).toBe(343);
    
    expect(functions.isEven(2)).toBe(true);
    expect(functions.isEven(3)).toBe(false);
});

/*test('Is that an even number?', () => {
    expect(functions.evenSteven(4).toBe(true));
})*/