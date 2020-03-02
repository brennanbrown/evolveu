import tax from './tax'

test('Are these functions working?', () => {
    expect(tax.taxCal(1)).toBe(0.15);
    expect(tax.taxCal(250)).toBe(37.50);
    expect(tax.taxCal(13000)).toBe(1950);
    expect(tax.taxCal(36135)).toBe(5420.25);
    expect(tax.taxCal(56789)).toBe(8972.32);
    expect(tax.taxCal(78910)).toBe(13507.13);
    expect(tax.taxCal(123456.78)).toBe(24090.54);
});