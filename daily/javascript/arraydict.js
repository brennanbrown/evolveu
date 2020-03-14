// MAIN

console.log("Testing the main.js")

// LOGIC

const functions  {
    caps = {
        "CA" : "Ottawa",
        "US" : "America",
        "FR" : "Paris",
        "DE" : "Berlin",
        "UK" : "London",
    }

    arrayAdd(arr, num) {
        console.log("This function is being called correctly.");
        arr.push(num);
        return arr;
    },

    arrayTotal(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++){
            total += arr[i];
        };
        return total;
    },

    getCountryCapital(code) {
        return functions.caps[code]; 
    },

    addCountry(code, value) {
        functions.caps[code] = value;
    }
}

export default functions;

// TESTING

import arrdict from "./arrdict.js"

test("Do these array tests work?", () => {
    console.log("This test is being called correctly.");
    const arr1 = arrdict.arrayAdd([1, 2], 5);
    expect(arr1.length).toBe(3);
    expect(arr1[2]).toBe(5);

    const arr2 = arrdict.arrayAdd([3, 4, 6], 7);
    expect(arr2.length).toBe(4);
    expect(arr2[3]).toBe(7);

    // Longhand
    const num1 = arrdict.arrayTotal([1,2]);
    expect(num1).toBe(3);

    // Shorthand
    expect(arrdict.arrayTotal([1,2])).toBe(4);
})

test("Do these dictionary tests work?", () => {
    expect(arrdict.getCountryCapital("CA")).toBe("Ottawa");
    expect(arrdict.getCountryCapital("US")).toBe("Washington");

}

// DICTIONARY //

// LOGIC

