import dict from './dict'

test('Are these functions working?', () => {
    expect(dict.findProvinceFromAbb("AB")).toBe("Alberta");
    expect(dict.findProvinceFromAbb("BC")).toBe("British Columbia");
    expect(dict.findProvinceFromAbb("error")).toBe(undefined);
});