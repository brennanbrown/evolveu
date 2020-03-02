import array from './array'

test('Are these functions working?', () => {
    expect(array.addElement(10)).toStrictEqual([10]);
    expect(array.sumArray([10, 20, 30])).toStrictEqual(60);
});