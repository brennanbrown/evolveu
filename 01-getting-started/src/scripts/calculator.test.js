import calculator from './calculator'

test('Are these functions working?', () => {
    
    expect(calculator.addFunc(34, 34)).toBe(68);
    expect(calculator.subtractFunc(111, 31)).toBe(80);
    expect(calculator.multiplyFunc(22, 3)).toBe(66);
    expect(calculator.divideFunc(54, 9)).toBe(6);
    
});
