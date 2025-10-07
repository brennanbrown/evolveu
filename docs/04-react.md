# Module 04: React Applications

**Learning Focus:** Component-based architecture, React fundamentals, state management, and modern hooks

## Table of Contents
1. [Module Overview](#module-overview)
2. [Core Concepts](#core-concepts)
3. [Project Walkthroughs](#project-walkthroughs)
4. [Bugs Fixed](#bugs-fixed)
5. [2021 vs 2025 Evolution](#2021-vs-2025-evolution)
6. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building

Module 04 contains **4 separate React projects**, each focusing on different aspects:

1. **react-00**: React fundamentals (components, props, state)
2. **react-01**: Simple "Hello World" starter
3. **react-02**: Complex application (Linked List + Cities manager)
4. **react-03**: Production-ready structure

### Why React?

Before React (2013), building interactive UIs meant:
- Manual DOM manipulation (jQuery spaghetti)
- Inconsistent state across components
- Difficult to maintain as apps grew

React introduced:
- **Component-based architecture**: Reusable UI pieces
- **Declarative**: Describe what you want, React handles how
- **Virtual DOM**: Fast, efficient updates
- **One-way data flow**: Predictable state management

### Module Statistics

- **11 tests total** across 4 projects
- **7 bugs fixed** in react-02
- **4 test files**: App.test.js, component tests
- **Key concepts**: Components, props, state, hooks, lifecycle

---

## Core Concepts

### 1. Components: The Building Blocks

**What is a Component?**
A component is a reusable piece of UI:

```jsx
// Function component (modern)
function Button({ label, onClick }) {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
}

// Usage
<Button label="Click me!" onClick={() => alert('Clicked!')} />
```

**Class vs Function Components:**

```jsx
// 2021 Style: Class Component
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    render() {
        return <h1>Count: {this.state.count}</h1>;
    }
}

// 2025 Style: Function Component with Hooks
function Welcome() {
    const [count, setCount] = useState(0);
    return <h1>Count: {count}</h1>;
}
```

### 2. Props: Passing Data Down

```jsx
// Parent passes data to child via props
function App() {
    return (
        <UserCard
            name="Brennan"
            age={25}
            email="brennan@example.com"
        />
    );
}

// Child receives data via props
function UserCard({ name, age, email }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
        </div>
    );
}
```

**Props Flow:**
```
Parent Component
    ↓ (props)
Child Component
    ↓ (props)
Grandchild Component
```

Props are **immutable** (read-only) in the child.

### 3. State: Managing Data

```jsx
import { useState } from 'react';

function Counter() {
    // Declare state variable
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

**State Rules:**
1. Never mutate state directly
2. Use setter function to update
3. Updates are asynchronous
4. State is local to component

### 4. Hooks: The Game Changer

```jsx
// useState: Manage component state
const [value, setValue] = useState(initialValue);

// useEffect: Side effects (API calls, subscriptions)
useEffect(() => {
    // Runs after render
    fetchData();
    
    // Cleanup function
    return () => cleanup();
}, [dependencies]);

// useContext: Share data without props drilling
const theme = useContext(ThemeContext);

// Custom hooks: Reusable logic
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);
    
    return [value, setValue];
}
```

---

## Project Walkthroughs

### react-00: Fundamentals

**Project Structure:**
```
react-00/
├── src/
│   ├── components/
│   │   ├── ClassComp.js         # Class component example
│   │   ├── ClassComp.test.js
│   │   ├── FuncComp.js          # Function component
│   │   ├── FuncComp.test.js
│   │   └── POJO.js              # Plain Old JavaScript Object
│   ├── App.js                   # Main component
│   └── App.test.js
└── package.json
```

**ClassComp.js - Class Component:**
```jsx
import React, { Component } from "react";

class ClassComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <h2>Class Component</h2>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>
                    Increment
                </button>
            </div>
        );
    }
}

export default ClassComp;
```

**FuncComp.js - Function Component:**
```jsx
import React, { useState } from "react";

function FuncComp() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Function Component</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default FuncComp;
```

**Why Both?**
- Learn class components (legacy code)
- Prefer function components (modern React)
- Understand evolution of React

### react-02: Complex Application

This is the most interesting project with **real data structures**:

**Features:**
1. **Doubly Linked List**: Custom data structure implementation
2. **City Manager**: CRUD operations with API integration
3. **UI Components**: Complex layouts and interactions

**LLPoJo.js - Linked List Implementation:**
```javascript
class Node {
    constructor(id, time, todo) {
        this.id = id;
        this.time = time;
        this.todo = todo;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.count = 0;
        this.current = null;
        this.head = null;
        this.tail = null;
    }

    // Add node to end of list
    append(time, todo) {  // ⚠️ BUG WAS HERE: params were swapped
        this.count++;
        const id = "k" + this.count;
        const node = new Node(id, time, todo);
        
        if (!this.head) {
            // First node
            this.current = node;
            this.head = node;
            this.tail = node;
        } else {
            // Add to end
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
            this.current = node;
        }
        
        return id;
    }

    // Get current node
    get() {  // ⚠️ BUG WAS HERE: returned .todo instead of node
        if (this.head === null) {
            return "(Currently Empty)";
        }
        return this.current;  // Return full node, not just todo
    }

    // Move to next node
    nextNode() {  // ⚠️ BUG WAS HERE: returned string instead of node
        if (this.tail == null) {
            return "(Currently Empty)";
        }
        
        if (this.current && this.current !== this.tail) {
            this.current = this.current.next;
            return this.current;  // Return node, not string
        }
        
        return this.current;
    }

    // Move to previous node
    prevNode() {  // ⚠️ BUG WAS HERE: returned string instead of node
        if (this.head == null) {
            return "(Currently Empty)";
        }
        
        if (this.current && this.current !== this.head) {
            this.current = this.current.prev;
            return this.current;  // Return node, not string
        }
        
        return this.current;
    }

    // Remove node by ID
    remove(id) {  // ⚠️ BUG WAS HERE: didn't accept ID parameter
        if (id) {
            let current = this.head;
            
            while (current) {
                if (current.id === id) {
                    // Handle different cases
                    if (current === this.head && current === this.tail) {
                        // Only node
                        this.head = null;
                        this.tail = null;
                        this.current = null;
                    } else if (current === this.head) {
                        // Head node
                        this.head = this.head.next;
                        this.head.prev = null;
                        if (this.current === current) {
                            this.current = this.head;
                        }
                    } else if (current === this.tail) {
                        // Tail node
                        this.tail = this.tail.prev;
                        this.tail.next = null;
                        if (this.current === current) {
                            this.current = this.tail;
                        }
                    } else {
                        // Middle node
                        current.prev.next = current.next;
                        current.next.prev = current.prev;
                        if (this.current === current) {
                            this.current = current.next;
                        }
                    }
                    
                    this.count--;
                    return true;
                }
                current = current.next;
            }
            return false;
        }
        
        // Original remove current logic...
    }
}

export default { Node, DoublyLinkedList };
```

**Why Linked Lists in React?**
- Demonstrates data structures in real apps
- Shows how to build custom classes for React
- Practice complex state management

**comunitycity.js - City Manager:**
```javascript
class City {
    constructor(key, name, latitude, longitude, population, hemisphere, communitySize) {
        this.name = String(name);
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.population = Number(population);
        this.hemisphere = String(hemisphere);
        this.communitySize = String(communitySize);
        this.key = String(key);
    }

    populationSize() {  // ⚠️ BUG WAS HERE: logic error
        const cityPopulation = this.population;
        
        if (cityPopulation < 0) return "[Error! Negative Population]";
        if (cityPopulation === 0) return "Ghost Town";
        if (cityPopulation >= 1 && cityPopulation < 100) return "Hamlet";
        if (cityPopulation >= 100 && cityPopulation < 1000) return "Village";
        if (cityPopulation >= 1000 && cityPopulation < 20000) return "Town";
        if (cityPopulation >= 20000 && cityPopulation < 100000) return " Large Town";
        if (cityPopulation >= 100000) return "City";  // Fixed: was >
        
        return "[Error! Undefined]";
    }
}
```

---

## Bugs Fixed

### React-02 Bug Summary (7 bugs)

**Bug #1: Linked List Parameter Order**
```javascript
// ❌ WRONG
append(todo, time) {
    const node = new Node(id, todo, time);  // Wrong order!
}

// ✅ CORRECT
append(time, todo) {
    const node = new Node(id, time, todo);  // Matches Node constructor
}
```

**Bug #2: get() Returns Wrong Type**
```javascript
// ❌ WRONG: Returns string, tests expect node
get() {
    return this.current.todo;  // Just the todo property
}

// ✅ CORRECT: Return full node
get() {
    return this.current;  // The entire node object
}
```

**Bug #3-4: nextNode/prevNode Return Types**
```javascript
// ❌ WRONG: Returns string when should return node
nextNode() {
    this.current = this.current.next;
    return "(Currently Empty)";  // Wrong!
}

// ✅ CORRECT: Return the node
nextNode() {
    this.current = this.current.next;
    return this.current;  // The node object
}
```

**Bug #5: remove() Missing ID Parameter**
```javascript
// ❌ WRONG: No way to specify which node to remove
remove() {
    // Only removes current node
}

// ✅ CORRECT: Accept ID parameter
remove(id) {
    // Find and remove node by ID
    let current = this.head;
    while (current) {
        if (current.id === id) {
            // Remove this node
        }
        current = current.next;
    }
}
```

**Bug #6: populationSize Logic Error**
```javascript
// ❌ WRONG: 100,000 falls through all conditions
if (cityPopulation > 100000) return "City";  // Excludes exactly 100k

// ✅ CORRECT: Use >= for threshold
if (cityPopulation >= 100000) return "City";  // Includes 100k
```

**Bug #7: Test Content Mismatch**
```javascript
// ❌ WRONG: Tests for text that doesn't exist
expect(getByText(/learn react/i)).toBeInTheDocument();

// ✅ CORRECT: Test for actual content
expect(getByText(/Welcome to Brennan's React Applications!/i)).toBeInTheDocument();
```

---

## 2021 vs 2025 Evolution

### Component Syntax

**2021: Class Components**
```jsx
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.increment = this.increment.bind(this);  // Binding!
    }
    
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
    
    componentDidMount() {
        console.log('Mounted');
    }
    
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.increment}>+</button>
            </div>
        );
    }
}
```

**2025: Function Components with Hooks**
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        console.log('Mounted');
    }, []);
    
    const increment = () => setCount(count + 1);
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
        </div>
    );
}
```

**Why the change?**
- ✅ Less boilerplate
- ✅ No `this` confusion
- ✅ Easier to share logic (custom hooks)
- ✅ Better TypeScript support

### Lifecycle Methods → Hooks

**2021: Lifecycle Methods**
```jsx
class DataFetcher extends React.Component {
    componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.fetchData();
        }
    }
    
    componentWillUnmount() {
        this.cleanup();
    }
    
    fetchData() {
        // Fetch logic
    }
}
```

**2025: useEffect Hook**
```jsx
function DataFetcher({ id }) {
    useEffect(() => {
        fetchData();
        
        return () => cleanup();  // Cleanup on unmount
    }, [id]);  // Re-run when id changes
    
    function fetchData() {
        // Fetch logic
    }
}
```

### State Management

**2021: this.setState**
```jsx
class Form extends React.Component {
    state = {
        name: '',
        email: '',
        age: 0
    };
    
    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    
    // Separate handler for each field...
}
```

**2025: Multiple useState**
```jsx
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    
    // Or use single state object
    const [form, setForm] = useState({ name: '', email: '', age: 0 });
    
    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };
}
```

### Build Tools

**2021: Create React App**
```bash
npx create-react-app my-app
# Uses Webpack, Babel
# ~200MB node_modules
# 3-5 second dev server startup
```

**2025: Vite**
```bash
npm create vite@latest my-app -- --template react
# Uses esbuild, Rollup
# ~100MB node_modules
# < 1 second dev server startup
# Hot Module Replacement (HMR)
```

---

## Key Takeaways

### React Mental Model

Think of React components as **functions that return UI**:

```jsx
function Component(props) {
    // 1. Get input (props)
    const { user } = props;
    
    // 2. Process (state, effects)
    const [likes, setLikes] = useState(0);
    
    // 3. Return output (JSX)
    return <div>{user.name} has {likes} likes</div>;
}
```

### Best Practices

**1. Component Composition**
```jsx
// ❌ BAD: One giant component
function App() {
    return (
        <div>
            {/* 500 lines of JSX */}
        </div>
    );
}

// ✅ GOOD: Small, focused components
function App() {
    return (
        <div>
            <Header />
            <Sidebar />
            <MainContent />
            <Footer />
        </div>
    );
}
```

**2. Props Destructuring**
```jsx
// ❌ BAD: Access via props object
function Card(props) {
    return <h2>{props.title}</h2>;
}

// ✅ GOOD: Destructure in parameters
function Card({ title, description, image }) {
    return (
        <div>
            <img src={image} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
```

**3. Key Prop for Lists**
```jsx
// ❌ BAD: No key or index as key
{items.map((item, index) => (
    <div key={index}>{item}</div>
))}

// ✅ GOOD: Unique ID as key
{items.map(item => (
    <div key={item.id}>{item.name}</div>
))}
```

**4. Conditional Rendering**
```jsx
// Multiple approaches
function Component({ isLoggedIn, user }) {
    // Approach 1: Ternary
    return isLoggedIn ? <Dashboard /> : <Login />;
    
    // Approach 2: && operator
    return <div>{isLoggedIn && <Dashboard />}</div>;
    
    // Approach 3: Early return
    if (!isLoggedIn) return <Login />;
    return <Dashboard />;
}
```

### Common Patterns

**Pattern 1: Container/Presenter**
```jsx
// Container: Logic
function UserListContainer() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);
    
    return <UserListPresenter users={users} />;
}

// Presenter: UI only
function UserListPresenter({ users }) {
    return (
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
```

**Pattern 2: Custom Hooks**
```jsx
// Reusable logic
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(r => r.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
    const { data, loading, error } = useApi(`/api/users/${userId}`);
    
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <Profile user={data} />;
}
```

**Pattern 3: Compound Components**
```jsx
function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <div>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    isActive: index === activeTab,
                    onClick: () => setActiveTab(index)
                })
            )}
        </div>
    );
}

// Usage
<Tabs>
    <Tab title="Home">Content 1</Tab>
    <Tab title="About">Content 2</Tab>
</Tabs>
```

---

## Further Learning

### Practice Projects

1. **Todo App**: Classic starter project
   - Add/edit/delete todos
   - Filter (all/active/completed)
   - LocalStorage persistence

2. **Weather App**: API integration
   - Fetch weather data
   - Display current conditions
   - 5-day forecast
   - Location search

3. **E-commerce Cart**: State management
   - Product catalog
   - Add to cart
   - Quantity updates
   - Total calculation

### Resources

- [React Official Docs](https://react.dev/)
- [React Hooks Reference](https://react.dev/reference/react)
- [React Patterns](https://reactpatterns.com/)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog)

### Next Module

Now that we understand modern frontend with React, let's explore the **backend** in [Module 05: Flask API Server](./05-api.md) →

---

**Module Status:** ✅ Complete (11/11 tests passing, 3 skipped integration tests)  
**Key Bugs Fixed:** 7 (mostly in react-02)  
**Time Investment:** ~6 hours  
**Key Achievement:** Understanding component-based architecture and the evolution from class to function components!
