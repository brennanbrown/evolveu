# Module 02: DOM Manipulation

**Learning Focus:** Document Object Model (DOM), dynamic HTML manipulation, and programmatic UI updates

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
This module introduces **DOM manipulation**—the ability to dynamically create, modify, and delete HTML elements using JavaScript. We build helper functions that:
- Create new DOM elements
- Insert elements before existing ones
- Insert elements after existing ones
- Append elements to containers

### Why DOM Manipulation Matters
Every modern web application needs to update the UI dynamically:
- **Social Media**: New posts appear without page reload
- **E-commerce**: Shopping cart updates instantly
- **Gmail**: Emails load and display dynamically
- **Google Maps**: Map pins added/removed on-the-fly

Without DOM manipulation, we'd need full page reloads for every change—slow and jarring UX.

---

## Core Concepts

### 1. What is the DOM?

The **Document Object Model** is a tree representation of HTML:

```html
<!-- HTML -->
<div id="container">
    <h1>Title</h1>
    <p>Content</p>
</div>
```

```
DOM Tree:
    div#container
    ├── h1 (Title)
    └── p (Content)
```

JavaScript can traverse and modify this tree:
```javascript
const container = document.getElementById('container');
container.innerHTML = '<h2>New Title</h2>';  // Modified!
```

### 2. Creating Elements

```javascript
// Create a new element
const newDiv = document.createElement('div');

// Set attributes
newDiv.id = 'myDiv';
newDiv.className = 'card';

// Set content
newDiv.textContent = 'Hello World';
newDiv.innerHTML = '<strong>Bold text</strong>';

// Result:
// <div id="myDiv" class="card"><strong>Bold text</strong></div>
```

### 3. Insertion Methods

```javascript
const parent = document.getElementById('container');
const newElement = document.createElement('p');

// Method 1: Append to end
parent.appendChild(newElement);

// Method 2: Insert before specific child
const referenceElement = parent.children[0];
parent.insertBefore(newElement, referenceElement);

// Method 3: Insert after (no native method!)
// This is why we build our own helper functions
```

### 4. Selecting Elements

```javascript
// By ID (returns single element)
const el = document.getElementById('myId');

// By class (returns collection)
const els = document.getElementsByClassName('myClass');

// By CSS selector (returns first match)
const el = document.querySelector('.myClass');

// By CSS selector (returns all matches)
const els = document.querySelectorAll('.myClass');
```

---

## Code Walkthrough

### File Structure
```
02-dom/
├── src/
│   ├── dom.js          # DOM manipulation functions
│   ├── dom.test.js     # Tests using jsdom
│   └── index.html      # Visual testing page
├── jest.config.js      # Configure jsdom environment
└── package.json
```

### dom.js - Core DOM Functions

```javascript
const domFunctions = {
    /**
     * Get a DOM element by ID
     * @param {string} id - The element ID
     * @returns {HTMLElement} The DOM element
     */
    getById: (id) => {
        return document.getElementById(id);
    },

    /**
     * Create a new DOM element
     * @param {string} type - Element type (div, p, span, etc.)
     * @returns {HTMLElement} New element
     */
    createNewDomElement: (type) => {
        return document.createElement(type);
    },

    /**
     * Set text content of an element
     * @param {HTMLElement} element - Target element
     * @param {string} text - Text to set
     * @returns {HTMLElement} The modified element
     */
    changeText: (element, text) => {
        element.textContent = text;
        return element;
    },

    /**
     * Set ID attribute of an element
     * @param {HTMLElement} element - Target element
     * @param {string} id - ID to set
     * @returns {HTMLElement} The modified element
     */
    changeId: (element, id) => {
        element.id = id;
        return element;
    },

    /**
     * Add a class to an element
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class to add
     * @returns {HTMLElement} The modified element
     */
    addClass: (element, className) => {
        element.classList.add(className);
        return element;
    },

    /**
     * Insert element BEFORE a reference element
     * @param {HTMLElement} newElement - Element to insert
     * @param {HTMLElement} referenceElement - Existing element
     */
    addBefore: (newElement, referenceElement) => {
        // ⚠️ BUG WAS HERE: Logic was swapped with addAfter
        referenceElement.parentNode.insertBefore(
            newElement,
            referenceElement
        );
    },

    /**
     * Insert element AFTER a reference element
     * @param {HTMLElement} newElement - Element to insert
     * @param {HTMLElement} referenceElement - Existing element
     */
    addAfter: (newElement, referenceElement) => {
        // ⚠️ BUG WAS HERE: Logic was swapped with addBefore
        referenceElement.parentNode.insertBefore(
            newElement,
            referenceElement.nextSibling
        );
    },

    /**
     * Append element as last child of parent
     * @param {HTMLElement} newElement - Element to add
     * @param {HTMLElement} parentElement - Parent container
     */
    addLast: (newElement, parentElement) => {
        parentElement.appendChild(newElement);
    }
};

export default domFunctions;
```

**Key Design Decisions:**

1. **Why return the element?**
   ```javascript
   // Allows method chaining
   domFunctions.createNewDomElement('div')
       .changeText(element, 'Hello')
       .addClass(element, 'card');
   ```

2. **Why `insertBefore` for `addAfter`?**
   - JavaScript has `insertBefore()` but no `insertAfter()`
   - We simulate `addAfter` by inserting before the `nextSibling`
   ```javascript
   // Insert after means: insert before the next element
   parent.insertBefore(newEl, referenceEl.nextSibling);
   ```

3. **Why use `classList.add()`?**
   ```javascript
   // ✅ GOOD: Preserves existing classes
   element.classList.add('new-class');
   
   // ❌ BAD: Overwrites existing classes
   element.className = 'new-class';
   ```

---

## Testing Strategy

### jest.config.js - Setting Up jsdom

```javascript
module.exports = {
  testEnvironment: 'jsdom',  // Simulate browser DOM
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  }
};
```

**Why jsdom?**
- Jest runs in Node.js (no browser)
- jsdom creates a fake DOM in memory
- We can test DOM operations without opening a browser

### dom.test.js - Test Suite

```javascript
import domFunctions from "./dom.js";

test("Does the dom functions work?", () => {
    // Create container element
    const parent = domFunctions.createNewDomElement('div');
    domFunctions.changeId(parent, 'parent');
    
    // Create first child
    const first = domFunctions.createNewDomElement('p');
    domFunctions.changeText(first, 'First');
    domFunctions.changeId(first, 'first');
    
    // Append first child to parent
    domFunctions.addLast(first, parent);
    
    // Verify structure
    expect(parent.id).toBe('parent');
    expect(parent.children.length).toBe(1);
    expect(parent.children[0].textContent).toBe('First');
});

test("Does the addBefore function work?", () => {
    // Setup: parent with one child
    const parent = domFunctions.createNewDomElement('div');
    const existing = domFunctions.createNewDomElement('p');
    domFunctions.changeId(existing, 'existing');
    domFunctions.addLast(existing, parent);
    
    // Add new element BEFORE existing
    const newElement = domFunctions.createNewDomElement('span');
    domFunctions.changeId(newElement, 'new');
    domFunctions.addBefore(newElement, existing);
    
    // Verify order
    expect(parent.children.length).toBe(2);
    expect(parent.children[0].id).toBe('new');      // New is first
    expect(parent.children[1].id).toBe('existing'); // Existing is second
});

test("Does the after function work?", () => {
    // Setup: parent with one child
    const parent = domFunctions.createNewDomElement('div');
    const existing = domFunctions.createNewDomElement('p');
    domFunctions.changeId(existing, 'existing');
    domFunctions.addLast(existing, parent);
    
    // Add new element AFTER existing
    const newElement = domFunctions.createNewDomElement('span');
    domFunctions.changeId(newElement, 'new');
    domFunctions.addAfter(newElement, existing);
    
    // Verify order
    expect(parent.children.length).toBe(2);
    expect(parent.children[0].id).toBe('existing'); // Existing is first
    expect(parent.children[1].id).toBe('new');      // New is second
});
```

**Testing Philosophy:**

Each test follows the **Arrange-Act-Assert** pattern:

1. **Arrange**: Set up DOM structure
2. **Act**: Perform DOM operation
3. **Assert**: Verify expected outcome

---

## Bugs Fixed

### Bug #1: Import Path Typo

```javascript
// ❌ WRONG: Incorrect filename
import domFunctions from "./domfunc.js";

// ✅ CORRECT: Match actual filename
import domFunctions from "./dom.js";
```

**Impact:** Tests couldn't find the module, all tests failed to run.

**How it happened:** Likely a typo when creating the test file.

**Lesson:** Always verify import paths match actual file names.

### Bug #2: addBefore/addAfter Logic Swapped

This was the most interesting bug—the logic was completely backwards!

```javascript
// ❌ WRONG: Functions did the opposite of their names
addBefore: (newElement, referenceElement) => {
    // This actually inserts AFTER!
    referenceElement.parentNode.insertBefore(
        newElement,
        referenceElement.nextSibling
    );
},

addAfter: (newElement, referenceElement) => {
    // This actually inserts BEFORE!
    referenceElement.parentNode.insertBefore(
        newElement,
        referenceElement
    );
}

// ✅ CORRECT: Swap the implementations
addBefore: (newElement, referenceElement) => {
    referenceElement.parentNode.insertBefore(
        newElement,
        referenceElement
    );
},

addAfter: (newElement, referenceElement) => {
    referenceElement.parentNode.insertBefore(
        newElement,
        referenceElement.nextSibling
    );
}
```

**Visual representation of the bug:**

```
Before Bug Fix:
Called addBefore() → Element appears AFTER
Called addAfter() → Element appears BEFORE

After Bug Fix:
Called addBefore() → Element appears BEFORE ✓
Called addAfter() → Element appears AFTER ✓
```

**How to avoid this:**
1. Write tests first (TDD)
2. Use descriptive variable names
3. Add comments explaining the logic

---

## 2021 vs 2025 Comparison

### DOM Manipulation Approaches

**2021: Direct DOM Manipulation**
```javascript
// Old way - direct HTML strings
const container = document.getElementById('app');
container.innerHTML = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
    </div>
`;
```

**Problems with 2021 approach:**
- ❌ Security risk (XSS attacks)
- ❌ Loses event listeners
- ❌ Destroys existing elements
- ❌ No type safety

**2025: Programmatic DOM Creation**
```javascript
// Modern way - create elements programmatically
const card = document.createElement('div');
card.className = 'card';

const title = document.createElement('h2');
title.textContent = titleText;  // Safe from XSS

const desc = document.createElement('p');
desc.textContent = descriptionText;

card.appendChild(title);
card.appendChild(desc);
container.appendChild(card);
```

**Benefits of 2025 approach:**
- ✅ XSS-safe (textContent escapes HTML)
- ✅ Preserves event listeners
- ✅ Fine-grained control
- ✅ Better for testing

### Modern Frameworks (React/Vue)

**Why we still learn vanilla DOM:**
Even though React exists, understanding the DOM is crucial:

```jsx
// React abstracts DOM manipulation
function Card({ title, description }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
```

**But React compiles to:**
```javascript
// Similar to what we write manually!
React.createElement('div', { className: 'card' },
    React.createElement('h2', null, title),
    React.createElement('p', null, description)
);
```

Understanding vanilla DOM helps you:
- Debug React issues
- Optimize performance
- Work with web components
- Understand what frameworks do under the hood

### Testing Evolution

**2021: Manual Browser Testing**
```javascript
// Old way - open browser, look at page
function testAddBefore() {
    const parent = document.getElementById('test-container');
    const existing = parent.children[0];
    const newEl = document.createElement('span');
    addBefore(newEl, existing);
    
    // Manually inspect page in browser
    console.log('Check if span is before existing element');
}
```

**2025: Automated jsdom Testing**
```javascript
// Modern way - automated tests
test("addBefore inserts element correctly", () => {
    const parent = document.createElement('div');
    const existing = document.createElement('p');
    parent.appendChild(existing);
    
    const newEl = document.createElement('span');
    addBefore(newEl, existing);
    
    // Automated assertion
    expect(parent.children[0]).toBe(newEl);
    expect(parent.children[1]).toBe(existing);
});
```

---

## Key Takeaways

### Core Skills Developed

1. **DOM Tree Navigation**
   ```javascript
   element.parentNode        // Go up
   element.children          // Go down
   element.nextSibling       // Go right
   element.previousSibling   // Go left
   ```

2. **Element Creation Pipeline**
   ```javascript
   Create → Configure → Insert
   ```

3. **Safe Content Updates**
   ```javascript
   // ✅ Safe from XSS
   element.textContent = userInput;
   
   // ❌ Dangerous!
   element.innerHTML = userInput;
   ```

4. **Testing DOM Code**
   - Use jsdom for unit tests
   - Create minimal DOM structures
   - Test insertion order carefully

### Common Patterns

**Pattern 1: Builder Functions**
```javascript
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const h2 = document.createElement('h2');
    h2.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = content;
    
    card.appendChild(h2);
    card.appendChild(p);
    
    return card;
}
```

**Pattern 2: Bulk Operations**
```javascript
// Create multiple elements efficiently
const items = ['Apple', 'Banana', 'Cherry'];
const fragment = document.createDocumentFragment();

items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
});

// Single reflow/repaint
list.appendChild(fragment);
```

**Pattern 3: Template Cloning**
```javascript
// Clone template instead of creating from scratch
const template = document.getElementById('card-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.title').textContent = 'New Title';
container.appendChild(clone);
```

### Performance Considerations

**Minimize Reflows:**
```javascript
// ❌ BAD: Multiple reflows
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    list.appendChild(li);  // Reflow every time!
}

// ✅ GOOD: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    fragment.appendChild(li);
}
list.appendChild(fragment);  // One reflow
```

**Batch Style Changes:**
```javascript
// ❌ BAD: Multiple style recalculations
element.style.width = '100px';   // Recalc
element.style.height = '200px';  // Recalc
element.style.color = 'red';     // Recalc

// ✅ GOOD: Single recalculation
element.style.cssText = 'width: 100px; height: 200px; color: red;';
```

---

## Further Learning

### Practice Exercises

1. **Dynamic List Builder:**
   - Create function that builds unordered list from array
   - Add click handlers to each item
   - Implement delete functionality

2. **Table Generator:**
   - Create table from 2D array
   - Add sorting by column
   - Implement cell editing

3. **Modal Creator:**
   - Build reusable modal component
   - Add open/close animations
   - Handle keyboard (ESC to close)

### Real-World Applications

- **Todo Lists**: Add/remove/edit items dynamically
- **Forms**: Add form fields on demand
- **Galleries**: Load images dynamically
- **Comments**: Add new comments without page reload
- **Notifications**: Show toast messages

### Recommended Resources

- [MDN DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JavaScript.info - Document](https://javascript.info/document)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Next Steps

Now that we understand DOM manipulation, we're ready for **object-oriented programming** and **API integration** in [Module 03: Objects & API Integration](./03-objects.md) →

---

**Module Status:** ✅ Complete (3/3 tests passing)  
**Key Bugs Fixed:** 2 (import path, swapped logic)  
**Time Investment:** ~2 hours  
**Key Skill:** Understanding the foundation that powers all frontend frameworks
