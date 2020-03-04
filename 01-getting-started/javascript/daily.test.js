import daily from './daily'

test('Are these functions working?', () => {
    expect(daily.convertToFahrenheit(0)).toBe(32);
    expect(daily.convertToFahrenheit(100)).toBe(212);
});