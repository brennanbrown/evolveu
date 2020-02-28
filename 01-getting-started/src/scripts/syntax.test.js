import syntax from './syntax'

test('Are these functions working?', () => {
	expect(syntax.numberCheck(5)).toBe(true);
	expect(syntax.numberCheck("String")).toBe(false);

	expect(syntax.stringCheck("String")).toBe(true);
	expect(syntax.stringCheck(5)).toBe(false);
	
	expect(syntax.booleanCheck(true)).toBe(true);
	expect(syntax.booleanCheck(5)).toBe(false);

	expect(syntax.arrayCheck(5)).toBe(false);
	expect(syntax.arrayCheck(["test", "test2", "test3"])).toBe(true);

	// 'toBe' function: serializes to the same string
	expect(syntax.arrayCreateFor([])).toStrictEqual([0, 1, 2, 3, 4]);
	expect(syntax.arrayCreateFor(5)).toBe(false);

	expect(syntax.arrayCreateWhile([])).toStrictEqual([0, 1, 2, 3, 4]);
	expect(syntax.arrayCreateWhile(5)).toBe(false);

	expect(syntax.stringConcat("test")).toBe("testtest");
	expect(syntax.stringConcat(5)).toBe(false);

	expect(syntax.dictionaryCheck( {FirstName: "Chris", "one": 1, 1: "some value"} )).toBe(true);
	expect(syntax.dictionaryCheck(5)).toBe(false);

	expect(syntax.undefinedCheck(5)).toBe(false);
	expect(syntax.undefinedCheck(undefined)).toBe(true);

});