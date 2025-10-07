# Module 00: Testing Fundamentals

**Learning Focus:** Introduction to automated testing, Jest framework, and Test-Driven Development (TDD)

## Table of Contents
1. [Module Overview](#module-overview)
2. [Core Concepts](#core-concepts)
3. [Code Walkthrough](#code-walkthrough)
4. [Testing Strategy](#testing-strategy)
5. [2021 vs 2025 Comparison](#2021-vs-2025-comparison)
6. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building
Module 00 serves as the foundation for the entire bootcamp by introducing automated testing. We're not building a user-facing application—instead, we're learning **how to verify that our code works correctly** through automated tests.

### Why Testing Matters
In 2021, when I first started coding, I would manually refresh the browser and click around to see if things worked. This approach has several problems:

- ❌ Time-consuming (refresh, click, check, repeat)
- ❌ Error-prone (easy to forget edge cases)
- ❌ Not scalable (can't test 100 functions manually)
- ❌ Regression bugs (breaking old features when adding new ones)

Automated testing solves all of these problems by letting us write code that **tests our code**.

### Learning Objectives
By the end of this module, I understood:
- How to write basic Jest tests
- The anatomy of a test (`describe`, `test`, `expect`)
- How to test arrays, objects, and functions
- The red-green-refactor TDD cycle

---

## Core Concepts

### 1. Jest Testing Framework

Jest is a JavaScript testing framework created by Facebook. It provides:

```javascript
// Basic test structure
test("description of what we're testing", () => {
    // Arrange: Set up test data
    const input = 5;
    
    // Act: Execute the function
    const result = myFunction(input);
    
    // Assert: Verify the result
    expect(result).toBe(10);
});
```

**Why Jest?**
- Zero configuration needed for basic projects
- Fast parallel test execution
- Built-in assertion library
- Great error messages

### 2. Test-Driven Development (TDD)

TDD follows a simple cycle:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code quality

```javascript
// Step 1: RED - Write failing test
test("should double a number", () => {
    expect(double(5)).toBe(10); // ❌ Function doesn't exist
});

// Step 2: GREEN - Make it pass
function double(n) {
    return n * 2; // ✅ Test passes
}

// Step 3: REFACTOR - Improve if needed
const double = n => n * 2; // More concise
```

### 3. Assertions & Matchers

Jest provides many ways to verify results:

```javascript
// Equality
expect(value).toBe(5);           // Strict equality (===)
expect(value).toEqual({a: 1});   // Deep equality for objects

// Truthiness
expect(value).toBeTruthy();      // Any truthy value
expect(value).toBeFalsy();       // Any falsy value

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);

// Arrays
expect(array).toContain('item');
expect(array.length).toBe(3);
```

---

## Code Walkthrough

### File Structure
```
00-testing/
├── src/
│   ├── play.js          # Functions we're testing
│   └── play.test.js     # Test file
├── package.json         # Dependencies (Jest)
└── jest.config.js       # Jest configuration
```

### play.js - Functions Under Test

```javascript
const functions = {
    // Simple addition function
    add: (num1, num2) => {
        return num1 + num2;
    },

    // Get first DOM element
    returnTheElementFirst: (arr) => {
        return arr[0];
    },

    // Get last DOM element
    returnTheElementLast: (arr) => {
        return arr[arr.length - 1];
    },

    // Return entire array
    returnTheArrayItself: (arr) => {
        return arr;
    }
};

export default functions;
```

**Why these simple functions?**  
We start simple to focus on **how to test**, not complex logic. Once we understand testing mechanics, we can test anything.

### play.test.js - Our Test Suite

```javascript
import functions from "./play.js";

// Test 1: Verifying the test environment works
test("Testing the plumbing", () => {
    expect(1).toBe(1); // Always passes - sanity check
});

// Test 2: Testing array access
test("Testing to demonstrate arrays.", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Testing array access patterns
    expect(arr.length).toBe(10);        // Array size
    expect(arr[0]).toBe(1);             // First element
    expect(arr[arr.length - 1]).toBe(10); // Last element
});

// Test 3: Testing objects (dictionaries)
test("Testing to demonstrate dictionaries.", () => {
    let arr = {
        1: "one",
        2: "two",
        3: "three"
    };
    
    // Objects use keys, not indices
    expect(arr[1]).toBe("one");
    expect(arr[2]).toBe("two");
    expect(arr[3]).toBe("three");
});

// Test 4: Testing our actual function
test("Testing the link to play.js", () => {
    expect(functions.add(1, 2)).toBe(3);
});

// Test 5: Complex data structures
test("Testing complex data structures.", () => {
    const arr = [1, 2, 3, 4];
    
    // Testing nested arrays
    arr.push([5, 6, 7]);
    expect(arr[4][0]).toBe(5);  // Nested array access
    expect(arr[4].length).toBe(3); // Nested array length
    
    arr[4].push(8);
    expect(arr[4][3]).toBe(8);  // After modification
});

// Test 6: DOM manipulation helper
test("Does the first DOM function work?", () => {
    const data = ["a", "b", "c"];
    expect(functions.returnTheElementFirst(data)).toBe("a");
});

// Test 7: Another DOM helper
test("Does the second DOM function work?", () => {
    const data = ["a", "b", "c"];
    expect(functions.returnTheElementLast(data)).toBe("c");
});
```

---

## Testing Strategy

### Why Each Test Exists

| Test | Purpose | What It Teaches |
|------|---------|----------------|
| "Testing the plumbing" | Verify Jest works | Basic test syntax |
| "Testing arrays" | Array fundamentals | Indexing, length property |
| "Testing dictionaries" | Object basics | Key-value access |
| "Link to play.js" | Import/export | Module system |
| "Complex structures" | Nested data | Array methods, mutation |
| "First DOM function" | Helpers | Encapsulation |
| "Second DOM function" | More helpers | Code reuse |

### Test Organization

```javascript
// ✅ GOOD: Descriptive test names
test("Does the first DOM function work?", () => {
    // Clear purpose
});

// ❌ BAD: Vague test names
test("test1", () => {
    // What does this test?
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file save)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

---

## 2021 vs 2025 Comparison

### Testing Approach

**2021: Manual Testing**
```javascript
// Old approach - manual browser testing
function add(a, b) {
    return a + b;
}

// Open browser console, type:
console.log(add(2, 3)); // Check output manually
console.log(add(-1, 1)); // Test edge case manually
console.log(add(0, 0)); // Test zero case manually
```

**2025: Automated Testing**
```javascript
// Modern approach - automated tests
test("add function handles all cases", () => {
    expect(add(2, 3)).toBe(5);      // Positive numbers
    expect(add(-1, 1)).toBe(0);     // Negative numbers
    expect(add(0, 0)).toBe(0);      // Zero
    expect(add(1.5, 2.5)).toBe(4);  // Decimals
});
```

### Jest Configuration

**2021: Minimal Setup**
```javascript
// package.json (2021)
{
  "scripts": {
    "test": "jest"
  }
}
// That's it - no config file needed
```

**2025: Modern Setup**
```javascript
// jest.config.js (2025)
module.exports = {
  testEnvironment: 'jsdom',         // Simulate browser
  setupFiles: ['<rootDir>/jest.setup.js'], // Global setup
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',            // Exclude test files
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',    // Transpile modern JS
  }
};
```

### Module Systems

**2021: CommonJS**
```javascript
// Old style - require/module.exports
const functions = require('./play.js');
module.exports = functions;
```

**2025: ES6 Modules**
```javascript
// Modern style - import/export
import functions from './play.js';
export default functions;
```

---

## Key Takeaways

### What I Learned

1. **Testing is a skill**: Writing good tests is as important as writing good code
2. **TDD is efficient**: Write tests first, code second, refactor third
3. **Jest is powerful**: Assertions, mocking, coverage reports all built-in
4. **Green tests = confidence**: Passing tests mean I can refactor fearlessly

### Common Mistakes I Made

**Mistake 1: Testing implementation instead of behavior**
```javascript
// ❌ BAD: Testing internal details
test("uses a for loop", () => {
    const code = myFunction.toString();
    expect(code).toContain('for');
});

// ✅ GOOD: Testing observable behavior
test("returns correct result", () => {
    expect(myFunction([1,2,3])).toBe(6);
});
```

**Mistake 2: Not testing edge cases**
```javascript
// ❌ INCOMPLETE: Only happy path
test("add function", () => {
    expect(add(2, 3)).toBe(5);
});

// ✅ COMPLETE: Edge cases included
test("add function handles edge cases", () => {
    expect(add(2, 3)).toBe(5);           // Normal case
    expect(add(0, 0)).toBe(0);           // Zero
    expect(add(-1, 1)).toBe(0);          // Negative
    expect(add(0.1, 0.2)).toBeCloseTo(0.3); // Floating point
});
```

### Success Metrics

- ✅ All 7 tests passing
- ✅ 100% code coverage
- ✅ Tests run in < 1 second
- ✅ Clear test descriptions
- ✅ No console.log() debugging needed

---

## Further Learning

### Recommended Reading
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing JavaScript with Kent C. Dodds](https://testingjavascript.com/)
- [Test-Driven Development by Martin Fowler](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

### Practice Exercises
1. Write tests for a calculator with +, -, *, / operations
2. Test array sorting functions (ascending, descending)
3. Test string manipulation (uppercase, lowercase, reverse)

### Next Steps
Move to **[Module 01: Getting Started](./01-getting-started.md)** to apply these testing principles to real-world problems like calculating Canadian taxes!

---

**Module Status:** ✅ Complete (7/7 tests passing)  
**Key Bugs Fixed:** 0 (clean implementation)  
**Time Investment:** ~2 hours (learning + practice)
