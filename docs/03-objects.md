# Module 03: Objects & API Integration

**Learning Focus:** Object-Oriented Programming (OOP), REST APIs, async/await, and full-stack integration

## Table of Contents
1. [Module Overview](#module-overview)
2. [Core Concepts](#core-concepts)
3. [Code Walkthrough](#code-walkthrough)
4. [API Integration](#api-integration)
5. [Testing Strategy](#testing-strategy)
6. [Bugs Fixed](#bugs-fixed)
7. [2021 vs 2025 Comparison](#2021-vs-2025-comparison)
8. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building

This module represents a major milestone: **building a full-stack application**. We create:

1. **Bank Account System** - OOP with classes and methods
2. **Geography/City Management** - Complex class hierarchies
3. **REST API Client** - Fetch data from Flask backend
4. **Integration Tests** - Full client-server testing

### Why This Matters

This is where everything comes together:
- **OOP**: Organize code like real-world objects
- **APIs**: Communicate between frontend and backend
- **Async/Await**: Handle asynchronous operations elegantly
- **Full-Stack**: Frontend (JavaScript) ↔ Backend (Flask/Python)

### Module Statistics

- **30 tests total** (largest test suite yet!)
- **14 bugs fixed** during audit
- **3 main classes**: Account, City, Community
- **5 API endpoints**: /add, /all, /read, /update, /delete, /clear

---

## Core Concepts

### 1. Object-Oriented Programming (OOP)

**What is a Class?**
A class is a blueprint for creating objects:

```javascript
// Class definition (blueprint)
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    describe() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

// Creating instances (actual objects)
const myCar = new Car('Honda', 'Civic', 2020);
const yourCar = new Car('Toyota', 'Camry', 2021);

console.log(myCar.describe());  // "2020 Honda Civic"
```

**The Four Pillars of OOP:**

1. **Encapsulation**: Bundle data with methods
   ```javascript
   class BankAccount {
       #balance = 0;  // Private field
       
       deposit(amount) {
           this.#balance += amount;  // Controlled access
       }
   }
   ```

2. **Inheritance**: Reuse code from parent classes
   ```javascript
   class SavingsAccount extends BankAccount {
       constructor(interestRate) {
           super();  // Call parent constructor
           this.interestRate = interestRate;
       }
   }
   ```

3. **Polymorphism**: Different classes, same interface
   ```javascript
   class Cat {
       speak() { return "Meow"; }
   }
   
   class Dog {
       speak() { return "Woof"; }
   }
   
   [new Cat(), new Dog()].forEach(animal => {
       console.log(animal.speak());  // Different behavior, same method
   });
   ```

4. **Abstraction**: Hide complexity, show only essentials
   ```javascript
   class EmailSender {
       send(to, subject, body) {
           // Hides SMTP complexity
           this.#connect();
           this.#authenticate();
           this.#sendMessage(to, subject, body);
           this.#disconnect();
       }
   }
   ```

### 2. REST API Communication

**What is REST?**
REST (Representational State Transfer) is a pattern for client-server communication:

```
Client (Browser)          Server (Flask)
     |                         |
     |---- GET /cities ------->|
     |                         |
     |<--- 200 OK + JSON ------|
     |    [{id:1, name:"..."}] |
```

**HTTP Methods:**
```javascript
GET     /cities        // Read all cities
GET     /cities/1      // Read one city
POST    /cities        // Create new city
PUT     /cities/1      // Update city
DELETE  /cities/1      // Delete city
```

**Our Flask Endpoints:**
```python
POST /add       # Add new city
POST /all       # Get all cities
POST /read      # Get city by key
POST /update    # Update city
POST /delete    # Delete city
GET  /clear     # Clear all data
```

### 3. Async/Await Pattern

**The Problem: Callback Hell (2015)**
```javascript
// Old way - nested callbacks
fetchData(url, function(data) {
    processData(data, function(result) {
        saveData(result, function(response) {
            console.log('Done!');  // Deeply nested!
        });
    });
});
```

**The Solution: Async/Await (2025)**
```javascript
// Modern way - linear code
async function workflow() {
    const data = await fetchData(url);
    const result = await processData(data);
    const response = await saveData(result);
    console.log('Done!');  // Readable!
}
```

**How It Works:**
```javascript
// 1. Mark function as async
async function getCities() {
    // 2. Use await for promises
    const response = await fetch('/api/cities');
    const data = await response.json();
    return data;
}

// 3. Call async function
getCities().then(cities => console.log(cities));
```

---

## Code Walkthrough

### File Structure
```
03-objects/
├── src/
│   ├── scripts/
│   │   ├── account.js          # Bank account class
│   │   ├── account.test.js
│   │   ├── geography.js        # ⭐ City/Community classes
│   │   ├── geography.test.js   # ⭐ Integration tests
│   │   ├── fetch.js            # ⭐ API utilities
│   │   └── fetch.test.js
│   └── index.html
├── jest.config.js              # jsdom + node-fetch config
├── jest.setup.js               # TextEncoder polyfill
└── package.json
```

### account.js - Bank Account System

```javascript
class Account {
    constructor(name, balance = 0) {
        this.name = name;
        this.balance = balance;
    }

    // Deposit money
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
        return this.balance;
    }

    // Withdraw money
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        }
        return this.balance;
    }

    // Display account info
    display() {
        return `${this.name}: $${this.balance}`;
    }

    // Validate new balance
    isNewAmount(newBalance) {
        if (typeof newBalance !== 'number') {
            return 'ERROR: Not a number';
        }
        if (newBalance < 0) {
            return 'ERROR: Negative balance';
        }
        this.balance = newBalance;
        return this.balance;
    }
}

export default Account;
```

**Design Decisions:**

1. **Default Parameters**: `balance = 0` allows creating accounts without initial balance
2. **Guard Clauses**: Check conditions before modifying state
3. **Return Values**: Methods return new balance for chaining/verification
4. **Validation**: `isNewAmount` prevents invalid states

**Real-World Usage:**
```javascript
const myAccount = new Account('Brennan', 1000);
myAccount.deposit(500);      // $1500
myAccount.withdraw(200);     // $1300
myAccount.display();         // "Brennan: $1300"
```

### geography.js - City Class

```javascript
class City {
    constructor(name, population, latitude, longitude, key) {
        this.name = name;
        this.population = population;
        this.latitude = latitude;
        this.longitude = longitude;
        this.key = key;
    }

    // Display city information
    show() {
        return `${this.name}, population: ${this.population}`;
    }

    // Population movement methods
    transferIn(amount) {
        this.population += amount;
        return this.population;
    }

    transferOut(amount) {
        this.population -= amount;
        return this.population;
    }

    // Determine hemisphere
    whichHemiphere() {
        if (this.latitude > 0) return 'Northern Hemisphere';
        if (this.latitude < 0) return 'Southern Hemisphere';
        return 'Equator';
    }

    // Classify city by population
    classification() {
        const pop = this.population;
        
        if (pop < 100) return 'Hamlet';
        if (pop < 1000) return 'Village';
        if (pop < 20000) return 'Town';
        if (pop < 100000) return 'Large Town';
        if (pop >= 100000) return 'City';  // ⚠️ BUG WAS HERE: used >
        
        return 'ERROR';
    }
}

export default City;
```

**Why These Methods?**

- **transferIn/Out**: Model population migration
- **whichHemiphere**: Demonstrate conditional logic on instance data
- **classification**: Graduated thresholds (like tax brackets!)

### geography.js - Community Class (Complex!)

```javascript
import functions from './fetch.js';

class Community {
    constructor() {
        this.url = 'http://localhost:5002/';
        this.community = [];
    }

    /**
     * Create a new city and store it on the server
     * ⚠️ This method had THE MOST bugs!
     */
    async createCity(city, latitude, longitude, population) {
        try {
            // 1. Get all existing cities to determine next key
            let data = await functions.postData(this.url + 'all');
            let i;
            
            if (data.length === 0) {
                i = 0;  // First city
            } else {
                // Find highest key
                i = data.sort((a, b) => b.key - a.key);
                i = i[0].key;
            }
            
            // 2. Create new city with next key
            // ⚠️ BUG WAS HERE: Parameter order was wrong!
            let myCity = new City(city, population, latitude, longitude, i + 1);
            
            // 3. Send to server
            data = await functions.postData(this.url + 'add', myCity);
            
            if (data.status === 200) {
                return data;
            }
            return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Get all cities from server
     */
    async getCommunity() {
        try {
            let data = await functions.postData(this.url + 'all');
            
            if (data.length > 0) {
                this.community = await JSON.parse(JSON.stringify(data));
                return this.community;
            }
            return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Get most northern city
     */
    getMostNorthern() {
        let data = this.community;
        if (data.length === 0) return 'ERROR';
        
        data.sort((a, b) => b.latitude - a.latitude);
        return data[0].name;
    }

    /**
     * Get most southern city
     */
    getMostSouthern() {
        let data = this.community;
        if (data.length === 0) return 'ERROR';
        
        data.sort((a, b) => a.latitude - b.latitude);
        return data[0].name;
    }

    /**
     * Calculate total population
     */
    async getTotalPopulation() {
        try {
            let data = await functions.postData(this.url + 'all');
            
            if (data.length > 0) {
                let population = data.map(city => city.population);
                population = population.reduce((a, b) => Number(a) + Number(b));
                return Number(population).toLocaleString();
            }
            return 'ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Update city population on server
     */
    async updatePopulation(city) {
        try {
            // ⚠️ BUG WAS HERE: Had unnecessary /all check
            let data = await functions.postData(this.url + 'update', {
                key: city.key,
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude,
                population: city.population
            });
            
            if (data.status === 200) {
                return data;
            }
            return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Delete city from server
     */
    async deleteCity(key) {
        try {
            let data = await functions.postData(this.url + 'delete', { key: key });
            
            if (data.status === 200) {
                return data;
            }
            return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

export { City, Community };
```

---

## API Integration

### fetch.js - API Utility Functions

```javascript
const functions = {
    url: "http://127.0.0.1:5002/",

    /**
     * Make POST request to server
     * Handles both array and object responses
     */
    async postData(url = "", info = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(info)
        });
        
        const text = await response.text();
        
        // ⚠️ BUG WAS HERE: Empty responses caused JSON.parse to fail
        let JSON_DATA = text ? JSON.parse(text) : {};
        
        // If it's an array, just return it (for /all endpoint)
        if (Array.isArray(JSON_DATA)) {
            return JSON_DATA;
        }
        
        // For objects, add status information
        JSON_DATA.status = response.status;
        JSON_DATA.statusText = response.statusText;
        return JSON_DATA;
    },

    /**
     * Extract first names from array of objects
     */
    retrieveAllNames(info) {
        try {
            return info.map(person => person.first_name);
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

export default functions;
```

**Critical Design Decisions:**

1. **Why differentiate array vs object responses?**
   ```javascript
   // /all endpoint returns array: [city1, city2, ...]
   // /add endpoint returns object: {status: 200, ...}
   
   // Need to handle both!
   if (Array.isArray(JSON_DATA)) {
       return JSON_DATA;  // No status needed for arrays
   }
   ```

2. **Why parse empty text?**
   ```javascript
   // Some endpoints return empty body with 200 status
   const text = await response.text();
   let JSON_DATA = text ? JSON.parse(text) : {};
   ```

3. **Why add status to response?**
   ```javascript
   // Tests need to verify status codes
   JSON_DATA.status = response.status;  // 200, 400, etc.
   ```

### Flask Backend (web.py)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from browser

data = {}
firstKeyType = None

@app.route("/add", methods=['POST'])
def add():
    global data, firstKeyType
    
    # Get data from request
    req = request.get_json()
    key = req.get('key')
    
    # Check if key already exists
    if key in data:
        return jsonify({}), 400  # Bad request
    
    # Store data
    data[key] = req
    return jsonify({}), 200

@app.route("/all", methods=['POST', 'GET'])
def get_all():
    # Return all data as array
    return jsonify(list(data.values())), 200

@app.route("/update", methods=['POST'])
def update():
    req = request.get_json()
    key = req.get('key')
    
    if key not in data:
        return jsonify({}), 400
    
    data[key] = req
    return jsonify({}), 200

@app.route("/delete", methods=['POST'])
def delete():
    req = request.get_json()
    key = req.get('key')
    
    if key not in data:
        return jsonify({}), 400
    
    del data[key]
    return jsonify({}), 200

@app.route("/clear", methods=['POST', 'GET'])
def clear():
    global data, firstKeyType
    data = {}
    firstKeyType = None  # ⚠️ BUG WAS HERE: Didn't reset this
    return jsonify(data), 200

if __name__ == '__main__':
    print("--- Starting", __file__)
    # ⚠️ Changed: debug=False to prevent hanging
    app.run(debug=False, use_reloader=False, port=5002)
```

---

## Testing Strategy

### Integration Test Setup

```javascript
// geography.test.js
import { City, Community } from "./geography.js"
import functions from "./fetch.js"
import fetch from "node-fetch";

// Use real fetch for integration tests
global.fetch = fetch;
const url = "http://localhost:5002/";

// Clear data before each test
beforeEach(async () => {
    await fetch(url + "clear");
    await new Promise(resolve => setTimeout(resolve, 50));
})
```

**Why this setup?**

1. **node-fetch**: Jest runs in Node.js, not browser—need fetch polyfill
2. **beforeEach**: Ensures clean state for every test
3. **setTimeout**: Small delay lets Flask process clear request
4. **Integration**: Tests full stack, not just JavaScript

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',           // Simulate browser
  setupFiles: ['<rootDir>/jest.setup.js'],  // Global setup
  maxWorkers: 1,                      // Run tests serially
  transformIgnorePatterns: [
    'node_modules/(?!(node-fetch)/)'  // Transpile node-fetch
  ],
};

// jest.setup.js
const { TextDecoder, TextEncoder } = require('util');
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
```

### Sample Tests

```javascript
test("Does the createCity function work?", async () => {
    const community = new Community;
    
    // Create first city
    let info = await community.createCity("Chestermere", 51.0382, 113.8425, 19887);
    expect(info.status).toBe(200);
    
    // Create second city
    info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
});

test("Does the getTotalPopulation function work?", async () => {
    const community = new Community;
    
    await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    
    expect(await community.getTotalPopulation()).toBe("835");
});

test("Does the updatePopulation function work?", async () => {
    const community = new Community;
    
    // Create city with 749,534 population
    let info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    info = await community.getCommunity();
    
    // Get the city from server
    let serverCity = info[0];
    let testCity = new City(
        serverCity.name,
        serverCity.population,
        serverCity.latitude,
        serverCity.longitude,
        serverCity.key
    );
    
    // Add 100,000 people
    testCity.transferIn(100000);
    
    // Update server
    await community.updatePopulation(testCity);
    
    // Verify update worked
    let update = await community.getCommunity();
    expect(update[0].population).toBe(849534);
});
```

---

## Bugs Fixed

This module had **14 bugs**—the most of any module! Let me detail the critical ones:

### Bug #1: City Constructor Parameter Order

```javascript
// ❌ WRONG: createCity passes parameters in wrong order
async createCity(city, latitude, longitude, population) {
    let myCity = new City(city, latitude, longitude, population, key);
    //                         ↑         ↑          ↑
    //                      WRONG     WRONG      WRONG
}

// ✅ CORRECT: Match City constructor signature
async createCity(city, latitude, longitude, population) {
    let myCity = new City(city, population, latitude, longitude, key);
    //                         ↑           ↑          ↑
    //                      RIGHT       RIGHT      RIGHT
}
```

**Impact:** Cities were created with latitude as population and vice versa!

### Bug #2: updatePopulation Unnecessary Check

```javascript
// ❌ WRONG: Checks /all status, but /all returns array!
async updatePopulation(city) {
    let data = await functions.postData(this.url + 'all');
    if (data.status === 200) {  // Arrays don't have .status!
        // This never runs!
    }
}

// ✅ CORRECT: Remove unnecessary check
async updatePopulation(city) {
    let data = await functions.postData(this.url + 'update', cityData);
    if (data.status === 200) {  // Now checking the right response
        return data;
    }
}
```

**Impact:** Updates never executed because condition always failed.

### Bug #3: Classification Threshold

```javascript
// ❌ WRONG: City classification uses > instead of >=
if (pop > 100000) return 'City';

// Results: 100,000 population returns undefined!

// ✅ CORRECT: Use >=
if (pop >= 100000) return 'City';
```

**Impact:** Cities with exactly 100,000 people fell through all conditions.

### Bug #4: Empty JSON Response Handling

```javascript
// ❌ WRONG: Fails when response is empty
const json = await response.json();  // Throws on empty body!

// ✅ CORRECT: Handle empty responses
const text = await response.text();
const json = text ? JSON.parse(text) : {};
```

**Impact:** Crashed when Flask returned 200 with empty body.

### Bug #5: Array vs Object Response

```javascript
// ❌ WRONG: Always adds status, even to arrays
let JSON_DATA = await response.json();
JSON_DATA.status = response.status;  // Adds to array!

// Result: [{city}, {city}].status = 200 (weird!)

// ✅ CORRECT: Only add status to objects
if (Array.isArray(JSON_DATA)) {
    return JSON_DATA;  // Arrays don't need status
} else {
    JSON_DATA.status = response.status;
    return JSON_DATA;
}
```

**Impact:** Tests failed because `data.status` was undefined for array responses.

### Bug #6: Port 5000 Conflict

```javascript
// ❌ WRONG: Port 5000 is used by macOS ControlCenter!
url: "http://127.0.0.1:5000/"  // Connection refused!

// ✅ CORRECT: Use port 5002
url: "http://127.0.0.1:5002/"
```

**Impact:** Fetch requests returned 403 Forbidden from system service.

### Bug #7: Flask Clear Endpoint

```python
# ❌ WRONG: Doesn't reset firstKeyType
@app.route("/clear")
def clear():
    global data
    data = {}
    return jsonify(data), 200

# ✅ CORRECT: Reset all global state
@app.route("/clear")
def clear():
    global data, firstKeyType
    data = {}
    firstKeyType = None  # Must reset this too!
    return jsonify(data), 200
```

**Impact:** State leaked between tests, causing unpredictable failures.

---

## 2021 vs 2025 Comparison

### Async Patterns

**2021: Promises & Callbacks**
```javascript
// Old way - promise chains
function getCities() {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return processData(data);
        })
        .then(result => {
            return saveResult(result);
        })
        .catch(error => {
            console.error(error);
        });
}
```

**2025: Async/Await**
```javascript
// Modern way - sequential syntax
async function getCities() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = await processData(data);
        return await saveResult(result);
    } catch (error) {
        console.error(error);
    }
}
```

### Class Syntax

**2021: Constructor Functions**
```javascript
// Old way - function constructors
function City(name, population) {
    this.name = name;
    this.population = population;
}

City.prototype.show = function() {
    return this.name;
};
```

**2025: ES6 Classes**
```javascript
// Modern way - class keyword
class City {
    constructor(name, population) {
        this.name = name;
        this.population = population;
    }
    
    show() {
        return this.name;
    }
}
```

### Module System

**2021: CommonJS**
```javascript
// Old way
const City = require('./city');
module.exports = City;
```

**2025: ES6 Modules**
```javascript
// Modern way
import { City } from './city.js';
export { City };
```

### CORS Handling

**2021: Manual CORS**
```javascript
// Old way - lots of options
fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
});
```

**2025: Simplified**
```javascript
// Modern way - just the essentials
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

---

## Key Takeaways

### Technical Skills

1. **OOP Mastery**: Classes, inheritance, encapsulation
2. **Async Programming**: Promise handling, error management
3. **REST APIs**: HTTP methods, status codes, JSON
4. **Full-Stack Integration**: Client-server architecture
5. **Test-Driven Development**: Integration testing

### Architecture Patterns

**Pattern 1: Repository Pattern**
```javascript
class CityRepository {
    async getAll() { return await fetch('/api/cities'); }
    async getOne(id) { return await fetch(`/api/cities/${id}`); }
    async create(city) { return await fetch('/api/cities', {...}); }
    async update(city) { return await fetch(`/api/cities/${city.id}`, {...}); }
    async delete(id) { return await fetch(`/api/cities/${id}`, {method: 'DELETE'}); }
}
```

**Pattern 2: Facade Pattern**
```javascript
// Hide complex API calls behind simple interface
class Community {
    async addCity(name, lat, lng, pop) {
        // Internally: fetch all, calculate key, create city, post to server
        // Externally: just call one method
    }
}
```

**Pattern 3: Error Handling**
```javascript
async function safeApiCall() {
    try {
        const data = await riskyOperation();
        return data;
    } catch (error) {
        console.error('Operation failed:', error);
        return 'ERROR';  // Graceful degradation
    }
}
```

### Debugging Lessons

1. **Parameter Order Matters**: Use named parameters for clarity
2. **Type Checking**: Arrays vs Objects need different handling
3. **Port Conflicts**: Check system services (lsof -i :port)
4. **State Management**: Clear global state between tests
5. **Response Handling**: Always check for empty responses

---

## Further Learning

### Practice Exercises

1. **Extend City Class:**
   - Add `timezone` property
   - Implement `distanceTo(otherCity)` method
   - Add `nearestNeighbor()` functionality

2. **Add Features:**
   - Search cities by name
   - Filter by population range
   - Sort by multiple criteria
   - Paginate results

3. **Error Handling:**
   - Retry failed requests
   - Implement timeout logic
   - Add loading states
   - Handle network errors gracefully

### Real-World Applications

- **Social Media**: User management, posts, comments
- **E-commerce**: Products, cart, orders
- **Mapping**: Locations, routes, POIs
- **CRM**: Contacts, companies, deals

### Recommended Resources

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript Classes](https://javascript.info/class)
- [REST API Design](https://restfulapi.net/)
- [Async/Await Tutorial](https://javascript.info/async-await)

### Next Module

Now that we understand full-stack integration, we're ready for **modern frontend frameworks** in [Module 04: React Applications](./04-react.md) →

---

**Module Status:** ✅ Complete (30/30 tests passing)  
**Key Bugs Fixed:** 14 (parameter order, response handling, port conflicts)  
**Time Investment:** ~8 hours (most complex module)  
**Key Achievement:** Built first full-stack application with working API integration!
