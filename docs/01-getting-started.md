# Module 01: Getting Started with JavaScript

**Learning Focus:** JavaScript fundamentals, arrays, objects, functions, and real-world problem solving (Canadian tax calculator)

## Table of Contents
1. [Module Overview](#module-overview)
2. [Core Concepts](#core-concepts)
3. [Code Walkthrough](#code-walkthrough)
4. [Testing Strategy](#testing-strategy)
5. [Bugs Fixed](#bugs-fixed)
6. [2021 vs 2025 Comparison](#2021-vs-2025-comparison)
7. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building
This module covers JavaScript fundamentals through practical exercises:
- **Tax Calculator**: Calculate Canadian federal income tax
- **Array Operations**: Manipulation, filtering, summing
- **Dictionary/Object Handling**: Key-value pair operations
- **Function Patterns**: Pure functions, callbacks, higher-order functions
- **Calculator**: Basic arithmetic operations

### Why These Topics Matter
Moving beyond "hello world," we tackle **real-world problems**:
- Tax calculation teaches **conditional logic** and **bracket systems**
- Arrays teach **iteration patterns** (map, filter, reduce)
- Objects teach **data modeling**
- Functions teach **code organization** and **reusability**

---

## Core Concepts

### 1. Canadian Tax Brackets (2021)

Canada uses a **progressive tax system** with multiple brackets:

```javascript
const TAX_BRACKETS = [
    { max: 49020, rate: 0.15 },    // 15% on first $49,020
    { max: 98040, rate: 0.205 },   // 20.5% on next chunk
    { max: 151978, rate: 0.26 },   // 26% on next chunk
    { max: 216511, rate: 0.29 },   // 29% on next chunk
    { max: Infinity, rate: 0.33 }  // 33% on remainder
];
```

**How Progressive Taxation Works:**
```
Income: $60,000

Bracket 1: $49,020 × 15% = $7,353.00
Bracket 2: $10,980 × 20.5% = $2,250.90
                     Total = $9,603.90
```

You DON'T pay 20.5% on the entire $60,000—only on the amount **over $49,020**.

### 2. Array Methods (The Holy Trinity)

```javascript
const numbers = [1, 2, 3, 4, 5];

// MAP: Transform each element
const doubled = numbers.map(n => n * 2);
// Result: [2, 4, 6, 8, 10]

// FILTER: Keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// Result: [2, 4]

// REDUCE: Combine elements into single value
const sum = numbers.reduce((total, n) => total + n, 0);
// Result: 15
```

**Why these matter:**
- **Map**: Transform data (e.g., convert prices to USD)
- **Filter**: Search/query (e.g., active users only)
- **Reduce**: Aggregation (e.g., total sales)

### 3. Pure Functions

```javascript
// ❌ IMPURE: Modifies external state
let total = 0;
function addToTotal(n) {
    total += n;  // Side effect!
    return total;
}

// ✅ PURE: No side effects, same input = same output
function add(a, b) {
    return a + b;  // Predictable!
}
```

**Pure functions are:**
- Easier to test
- Easier to debug
- Easier to reason about
- Safe to parallelize

---

## Code Walkthrough

### File Structure
```
01-getting-started/
├── src/
│   ├── scripts/
│   │   ├── array.js          # Array operations
│   │   ├── array.test.js     # Array tests
│   │   ├── calculator.js     # Basic math
│   │   ├── calculator.test.js
│   │   ├── dict.js           # Object/dictionary ops
│   │   ├── dict.test.js
│   │   ├── functions.js      # Function exercises
│   │   ├── functions.test.js
│   │   ├── syntax.js         # JS syntax basics
│   │   ├── syntax.test.js
│   │   ├── tax.js            # ⭐ Tax calculator
│   │   └── tax.test.js       # ⭐ Tax tests
│   └── index.html
└── package.json
```

### tax.js - The Tax Calculator (Most Complex)

```javascript
const TAX = [
    [49020, 0.15],
    [98040, 0.205],
    [151978, 0.26],
    [216511, 0.29],
    [Infinity, 0.33]
];

const taxCalc = {
    // Calculate tax for a specific bracket
    calcTaxForBracket: (previousMax, currentMax, rate, income) => {
        if (income <= previousMax) {
            return 0;  // Income doesn't reach this bracket
        }
        
        // How much income falls in this bracket?
        const taxableInThisBracket = Math.min(income, currentMax) - previousMax;
        
        return taxableInThisBracket * rate;
    },

    // Calculate total tax across all brackets
    calcTax: (income) => {
        let totalTax = 0;
        let previousMax = 0;

        // Iterate through each bracket
        for (let i = 0; i < TAX.length; i++) {
            const [currentMax, rate] = TAX[i];
            
            const taxForBracket = taxCalc.calcTaxForBracket(
                previousMax,
                currentMax,
                rate,
                income
            );
            
            totalTax += taxForBracket;
            previousMax = currentMax;
            
            // Stop if we've exceeded income
            if (income <= currentMax) break;
        }

        return totalTax;
    },

    // Calculate after-tax income
    calcTaxWithRemainder: (income) => {
        const tax = taxCalc.calcTax(income);
        return {
            tax: tax,
            afterTax: income - tax
        };
    }
};

export default taxCalc;
```

**Key Design Decisions:**

1. **Why separate `calcTaxForBracket`?**
   - Single Responsibility Principle
   - Easier to test individual brackets
   - Reusable logic

2. **Why use array destructuring?**
   ```javascript
   const [currentMax, rate] = TAX[i];
   // Instead of:
   const currentMax = TAX[i][0];
   const rate = TAX[i][1];
   ```
   Cleaner, more readable code.

3. **Why `Math.min(income, currentMax)`?**
   - Handles the case where income is in the middle of a bracket
   - Example: Income $55,000 in bracket [$49,020 - $98,040]
   - Only $5,980 is taxed at 20.5%, not the full bracket range

### array.js - Array Operations

```javascript
const arrayFunctions = {
    // Add element to array and return it
    addElement: (arr, element) => {
        arr.push(element);
        return arr;  // ⚠️ BUG WAS HERE: Originally didn't return
    },

    // Sum all numbers in array
    sumArray: (arr) => {
        return arr.reduce((total, element) => {
            return total + element;
        }, 0);
        // ⚠️ BUG WAS HERE: Used global `arr` instead of parameter
    },

    // Remove element at specific index
    removeElement: (arr, index) => {
        arr.splice(index, 1);
        return arr;
    }
};
```

**Bug Story: The Global Variable Mistake**

Original broken code:
```javascript
let arr = []; // Global variable

sumArray: (element) => {
    return arr.reduce((total, num) => total + num, 0);
    // ❌ Uses global `arr`, not the parameter!
}
```

Why this failed:
```javascript
sumArray([1, 2, 3]);  // Returns 0 (global arr is empty)
sumArray([5, 5]);     // Still returns 0!
```

The fix:
```javascript
sumArray: (arr) => {  // ✅ Use parameter name
    return arr.reduce((total, element) => total + element, 0);
}
```

### dict.js - Dictionary/Object Operations

```javascript
const dictFunctions = {
    // Loop 1: Return value by key
    returnTheSecondtItemByKey: (obj) => {
        return obj[Object.keys(obj)[1]];
    },

    // Loop 2: Return value when key matches condition
    returnTheThirdItemByValue: (obj) => {
        for (const key in obj) {
            if (obj[key] === key) {  // ⚠️ BUG WAS HERE
                return obj[key];
            }
        }
        return "error!";
    }
};
```

**Bug Story: The Always-Returning-Error Loop**

Original broken code:
```javascript
returnTheThirdItemByValue: (obj) => {
    for (const key in obj) {
        if (obj[key] === key) {
            return obj[key];
        }
        return "error!";  // ❌ WRONG! Returns on first iteration
    }
}
```

Why this failed:
- The `return "error!"` was **inside the loop**
- It would execute on the **first iteration** if the condition failed
- The loop never got a chance to check other keys

The fix:
```javascript
returnTheThirdItemByValue: (obj) => {
    for (const key in obj) {
        if (obj[key] === key) {
            return obj[key];
        }
    }
    return "error!";  // ✅ Outside loop, runs only if nothing found
}
```

---

## Testing Strategy

### tax.test.js - Tax Calculator Tests

```javascript
import taxCalc from "./tax.js";

test("Testing the function that calculates tax for a single bracket", () => {
    // Test bracket 1: $49,020 at 15%
    expect(taxCalc.calcTaxForBracket(0, 49020, 0.15, 30000))
        .toBeCloseTo(4500, 1);  // $30,000 × 15% = $4,500
        
    // Test bracket 2: Income partially in bracket
    expect(taxCalc.calcTaxForBracket(49020, 98040, 0.205, 60000))
        .toBeCloseTo(2250.9, 1);  // $10,980 × 20.5% = $2,250.90
});

test("Testing the function that calculates total tax", () => {
    // Income: $60,000
    // Bracket 1: $49,020 × 15% = $7,353.00
    // Bracket 2: $10,980 × 20.5% = $2,250.90
    // Total: $9,603.90
    expect(taxCalc.calcTax(60000)).toBeCloseTo(9603.9, 1);
    
    // Edge case: Exactly at bracket boundary
    expect(taxCalc.calcTax(49020)).toBeCloseTo(7353, 1);
});

test("Testing the function that calculates after-tax income", () => {
    const result = taxCalc.calcTaxWithRemainder(60000);
    expect(result.tax).toBeCloseTo(9603.9, 1);
    expect(result.afterTax).toBeCloseTo(50396.1, 1);
});
```

**Why `toBeCloseTo()` instead of `toBe()`?**

JavaScript floating-point arithmetic isn't exact:
```javascript
0.1 + 0.2 === 0.3  // false! (actually 0.30000000000000004)
```

`toBeCloseTo(value, decimals)` handles this:
```javascript
expect(0.1 + 0.2).toBeCloseTo(0.3, 10);  // ✅ Passes
```

### array.test.js - Array Tests

```javascript
import arrayFunctions from "./array.js";

test("Does the addElement function work?", () => {
    const arr = [1, 2, 3];
    const result = arrayFunctions.addElement(arr, 4);
    
    expect(result).toEqual([1, 2, 3, 4]);
    expect(result.length).toBe(4);
});

test("Does the sumArray function work?", () => {
    expect(arrayFunctions.sumArray([1, 2, 3])).toBe(6);
    expect(arrayFunctions.sumArray([0])).toBe(0);
    expect(arrayFunctions.sumArray([-1, 1])).toBe(0);
});
```

---

## Bugs Fixed

During the 2025 audit, I discovered and fixed **5 critical bugs** in this module:

### Bug #1: Tax Array Indexing
```javascript
// ❌ WRONG: Incorrectly accessing tax bracket data
const previousMax = TAX[i - 1][1];  // Gets RATE instead of MAX

// ✅ CORRECT: Access the right index
const previousMax = TAX[i - 1][0];  // Gets MAX value
```

**Impact:** Calculated wrong tax amounts for all brackets after the first.

### Bug #2: Tax Income Calculation
```javascript
// ❌ WRONG: Used wrong variable names
const total_tax_income = Math.min(income, P[1]) - P[0];

// ✅ CORRECT: Use consistent naming
const total_tax_income = Math.min(income, TAX[i][0]) - previousMax;
```

**Impact:** Logic errors in else-if blocks caused incorrect tax calculations.

### Bug #3: Dictionary Loop Returns Early
```javascript
// ❌ WRONG: Always returns "error!" on first iteration
for (const key in obj) {
    if (condition) return value;
    return "error!";  // Inside loop!
}

// ✅ CORRECT: Return after checking all keys
for (const key in obj) {
    if (condition) return value;
}
return "error!";  // Outside loop
```

**Impact:** Function never checked beyond first key.

### Bug #4: Array Function Doesn't Return
```javascript
// ❌ WRONG: Modifies array but doesn't return it
addElement: (arr, element) => {
    arr.push(element);
    // Missing return statement!
}

// ✅ CORRECT: Return the modified array
addElement: (arr, element) => {
    arr.push(element);
    return arr;
}
```

**Impact:** Chaining array operations failed.

### Bug #5: sumArray Uses Wrong Variable
```javascript
// ❌ WRONG: Uses global `arr` instead of parameter
sumArray: (element) => {
    return arr.reduce((total, num) => total + num);
}

// ✅ CORRECT: Use function parameter
sumArray: (arr) => {
    return arr.reduce((total, element) => total + element, 0);
}
```

**Impact:** Always returned 0 or crashed.

---

## 2021 vs 2025 Comparison

### Coding Style Evolution

**2021: Verbose, Imperative**
```javascript
// Old style - manual loops
function sumArray(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total = total + arr[i];
    }
    return total;
}
```

**2025: Concise, Declarative**
```javascript
// Modern style - array methods
const sumArray = arr => arr.reduce((total, n) => total + n, 0);
```

### Tax Calculator Comparison

**2021 Approach:**
```javascript
// Lots of if-else statements
function calcTax(income) {
    if (income <= 49020) {
        return income * 0.15;
    } else if (income <= 98040) {
        return 49020 * 0.15 + (income - 49020) * 0.205;
    } else if (income <= 151978) {
        return 49020 * 0.15 + 49020 * 0.205 + (income - 98040) * 0.26;
    }
    // ... more nested conditions
}
```

Problems:
- Hard to maintain
- Repetitive calculations
- Difficult to add new brackets
- Error-prone

**2025 Approach:**
```javascript
// Data-driven with iteration
const TAX = [[49020, 0.15], [98040, 0.205], ...];

function calcTax(income) {
    let total = 0;
    let prev = 0;
    
    for (const [max, rate] of TAX) {
        if (income <= prev) break;
        total += Math.min(income, max) - prev) * rate;
        prev = max;
    }
    
    return total;
}
```

Benefits:
- ✅ Easy to update tax brackets (just change data)
- ✅ Single source of truth
- ✅ No code duplication
- ✅ Scales to any number of brackets

### Testing Philosophy

**2021: Manual Console Testing**
```javascript
// Old way - manual verification
console.log(taxCalc.calcTax(60000));  // Eyeball the result
console.log(taxCalc.calcTax(100000)); // Check each case manually
```

**2025: Automated Test Suite**
```javascript
// Modern way - automated verification
test("calculates tax correctly", () => {
    expect(taxCalc.calcTax(60000)).toBeCloseTo(9603.9, 1);
    expect(taxCalc.calcTax(100000)).toBeCloseTo(17991.9, 1);
    expect(taxCalc.calcTax(49020)).toBeCloseTo(7353, 1);
});
```

---

## Key Takeaways

### Technical Skills Gained

1. **Progressive Systems**: Understanding stepped calculations (taxes, shipping tiers)
2. **Array Mastery**: map(), filter(), reduce() for data transformation
3. **Object Manipulation**: Iterating, accessing, transforming key-value pairs
4. **Pure Functions**: Writing predictable, testable code
5. **Edge Case Handling**: Boundary values, empty arrays, negative numbers

### Problem-Solving Patterns

**Pattern 1: Accumulation**
```javascript
// Start with initial value, build up result
const sum = numbers.reduce((acc, n) => acc + n, 0);
const product = numbers.reduce((acc, n) => acc * n, 1);
```

**Pattern 2: Transformation**
```javascript
// Convert each item to new form
const doubled = numbers.map(n => n * 2);
const names = users.map(user => user.name);
```

**Pattern 3: Filtering**
```javascript
// Keep only items that pass test
const evens = numbers.filter(n => n % 2 === 0);
const adults = users.filter(user => user.age >= 18);
```

### Common Pitfalls Avoided

1. **Off-by-one errors** in array indexing
2. **Mutating vs returning** new values
3. **Global state** pollution
4. **Early returns** in loops
5. **Floating-point** comparison issues

---

## Further Learning

### Practice Exercises

1. **Tax Calculator Extensions:**
   - Add provincial tax rates
   - Calculate marginal vs effective tax rate
   - Handle different tax years

2. **Array Challenges:**
   - Find median value
   - Remove duplicates
   - Flatten nested arrays

3. **Object Operations:**
   - Deep clone objects
   - Merge multiple objects
   - Transform object shape

### Recommended Resources

- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Functional Programming in JavaScript](https://github.com/MostlyAdequate/mostly-adequate-guide)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

### Real-World Applications

These patterns appear everywhere:
- **E-commerce**: Calculate shipping costs, apply discounts
- **Finance**: Interest calculations, loan amortization
- **Analytics**: Aggregate user data, generate reports
- **Forms**: Validate inputs, transform data for API

---

**Module Status:** ✅ Complete (8/8 tests passing)  
**Key Bugs Fixed:** 5 (tax indexing, loop logic, array operations)  
**Time Investment:** ~4 hours (including debugging)  
**Next Module:** [Module 02: DOM Manipulation](./02-dom.md) →
