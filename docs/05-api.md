# Module 05: Flask API Server

**Learning Focus:** RESTful API design, Flask framework, backend development, and CRUD operations

## Table of Contents
1. [Module Overview](#module-overview)
2. [Core Concepts](#core-concepts)
3. [Code Walkthrough](#code-walkthrough)
4. [API Endpoints](#api-endpoints)
5. [Testing & Debugging](#testing--debugging)
6. [2021 vs 2025 Comparison](#2021-vs-2025-comparison)
7. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building

A **RESTful API server** using Flask that provides CRUD operations for city data:
- **Create**: Add new cities
- **Read**: Retrieve city data
- **Update**: Modify existing cities
- **Delete**: Remove cities
- **List**: Get all cities

This server powers the JavaScript frontend from Module 03.

### Why Flask?

Flask is a **micro-framework** for Python web development:
- ✅ Lightweight (minimal boilerplate)
- ✅ Flexible (add only what you need)
- ✅ Python-based (easy for beginners)
- ✅ Great for APIs and microservices

**Alternatives:**
- **Django**: Full-featured, more opinionated
- **FastAPI**: Modern, async, automatic docs
- **Express.js**: Node.js-based

---

## Core Concepts

### 1. What is a REST API?

**REST** = Representational State Transfer

Key principles:
1. **Stateless**: Each request contains all needed info
2. **Resource-based**: URLs represent resources
3. **HTTP methods**: GET, POST, PUT, DELETE
4. **JSON**: Standard data format

```python
# RESTful URL design
GET    /cities         # Get all cities
GET    /cities/1       # Get city with ID 1
POST   /cities         # Create new city
PUT    /cities/1       # Update city 1
DELETE /cities/1       # Delete city 1
```

### 2. HTTP Status Codes

```python
# Success codes (2xx)
200 OK                  # Request succeeded
201 Created             # Resource created
204 No Content          # Success, no data to return

# Client error codes (4xx)
400 Bad Request         # Invalid data
401 Unauthorized        # Authentication required
403 Forbidden           # No permission
404 Not Found           # Resource doesn't exist

# Server error codes (5xx)
500 Internal Server Error   # Server crashed
503 Service Unavailable     # Server overloaded
```

### 3. CORS (Cross-Origin Resource Sharing)

**The Problem:**
```
Browser (http://localhost:3000)
    ↓
    Tries to call API (http://localhost:5002)
    ↓
❌ BLOCKED! Different origin!
```

**The Solution:**
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

# Or specific origin
CORS(app, origins=["http://localhost:3000"])
```

### 4. Request/Response Cycle

```python
@app.route("/api/cities", methods=['POST'])
def create_city():
    # 1. Receive request
    data = request.get_json()
    
    # 2. Validate
    if 'name' not in data:
        return jsonify({'error': 'Name required'}), 400
    
    # 3. Process
    city = create_city_object(data)
    
    # 4. Respond
    return jsonify(city), 201
```

---

## Code Walkthrough

### File Structure
```
05-api/
├── venv/                # Virtual environment
├── web.py              # ⭐ Main Flask app
├── requirements.txt    # Dependencies
└── README.md
```

### web.py - The Flask Server

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global data storage (in-memory)
data = {}
firstKeyType = None

@app.route("/test", methods=['POST'])
def test():
    """
    Test endpoint to verify server is running
    Returns: {"status": "ok"}
    """
    try:
        return jsonify({'status': 'ok'}), 200
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    return jsonify('{}'), 400


@app.route("/add", methods=['POST'])
def add():
    """
    Add a new city to the database
    
    Request body: {
        "key": "1",
        "name": "Calgary",
        "latitude": 51.0447,
        "longitude": -114.0719,
        "population": 1547484
    }
    
    Returns: 200 OK or 400 Bad Request (if key exists)
    """
    global data, firstKeyType
    
    try:
        req = request.get_json()
        key = req.get('key')
        
        # Type consistency check
        if firstKeyType is None:
            firstKeyType = type(key)
        elif type(key) != firstKeyType:
            return jsonify({}), 400
        
        # Duplicate key check
        if key in data:
            return jsonify({}), 400
        
        # Store data
        data[key] = req
        return jsonify({}), 200
        
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    
    return jsonify('{}'), 400


@app.route("/all", methods=['POST', 'GET'])
def get_all():
    """
    Get all cities from the database
    
    Returns: Array of city objects
    Example: [
        {"key": "1", "name": "Calgary", ...},
        {"key": "2", "name": "Edmonton", ...}
    ]
    """
    try:
        # Return all values as array
        return jsonify(list(data.values())), 200
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    
    return jsonify('{}'), 400


@app.route("/read", methods=['POST'])
def read():
    """
    Get a specific city by key
    
    Request body: {"key": "1"}
    
    Returns: Single city object or 400 if not found
    """
    try:
        req = request.get_json()
        key = req.get('key')
        
        if key in data:
            return jsonify([data[key]]), 200
        
        return jsonify({}), 400
        
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    
    return jsonify('{}'), 400


@app.route("/update", methods=['POST'])
def update():
    """
    Update an existing city
    
    Request body: {
        "key": "1",
        "name": "Calgary Updated",
        "latitude": 51.0447,
        "longitude": -114.0719,
        "population": 1600000
    }
    
    Returns: 200 OK or 400 if key doesn't exist
    """
    try:
        req = request.get_json()
        key = req.get('key')
        
        if key not in data:
            return jsonify({}), 400
        
        # Update the data
        data[key] = req
        return jsonify({}), 200
        
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    
    return jsonify('{}'), 400


@app.route("/delete", methods=['POST'])
def delete():
    """
    Delete a city by key
    
    Request body: {"key": "1"}
    
    Returns: 200 OK or 400 if key doesn't exist
    """
    try:
        req = request.get_json()
        key = req.get('key')
        
        if key not in data:
            return jsonify({}), 400
        
        # Remove from dictionary
        del data[key]
        return jsonify({}), 200
        
    except Exception as e:
        traceback.print_stack()
        print('**** Not a valid request. ', e)
    
    return jsonify('{}'), 400


@app.route("/clear", methods=['POST', 'GET'])
def clear():
    """
    Clear all data from the database
    Used primarily for testing
    
    Returns: Empty object with 200 OK
    """
    global data, firstKeyType
    
    data = {}
    firstKeyType = None  # ⚠️ BUG WAS HERE: Didn't reset this
    
    return jsonify(data), 200


if __name__ == '__main__':
    print("--- Starting", __file__)
    # ⚠️ Changed from default to prevent hanging:
    # debug=False, use_reloader=False
    app.run(debug=False, use_reloader=False, port=5002)
```

---

## API Endpoints

### Complete API Reference

#### POST /test
**Purpose**: Health check endpoint

**Request**: Empty or any JSON
```json
{}
```

**Response**: 200 OK
```json
{
    "status": "ok"
}
```

---

#### POST /add
**Purpose**: Create a new city

**Request**:
```json
{
    "key": "1",
    "name": "Calgary",
    "latitude": 51.0447,
    "longitude": -114.0719,
    "population": 1547484
}
```

**Response**: 200 OK (empty body) or 400 Bad Request

**Validation**:
- ❌ Duplicate key → 400
- ❌ Inconsistent key type → 400

---

#### POST /all or GET /all
**Purpose**: Retrieve all cities

**Request**: Empty
```json
{}
```

**Response**: 200 OK
```json
[
    {
        "key": "1",
        "name": "Calgary",
        "latitude": 51.0447,
        "longitude": -114.0719,
        "population": 1547484
    },
    {
        "key": "2",
        "name": "Edmonton",
        "latitude": 53.5461,
        "longitude": -113.4938,
        "population": 981280
    }
]
```

---

#### POST /read
**Purpose**: Get specific city by key

**Request**:
```json
{
    "key": "1"
}
```

**Response**: 200 OK
```json
[
    {
        "key": "1",
        "name": "Calgary",
        ...
    }
]
```

Or 400 Bad Request if key not found.

---

#### POST /update
**Purpose**: Update existing city

**Request**:
```json
{
    "key": "1",
    "name": "Calgary Updated",
    "population": 1600000,
    ...
}
```

**Response**: 200 OK (empty body) or 400 Bad Request

---

#### POST /delete
**Purpose**: Delete city by key

**Request**:
```json
{
    "key": "1"
}
```

**Response**: 200 OK (empty body) or 400 Bad Request

---

#### POST /clear or GET /clear
**Purpose**: Delete all data (testing only)

**Request**: Empty

**Response**: 200 OK
```json
{}
```

---

## Testing & Debugging

### Manual Testing with curl

```bash
# Test server is running
curl http://localhost:5002/test

# Add a city
curl -X POST http://localhost:5002/add \
  -H "Content-Type: application/json" \
  -d '{"key":"1","name":"Calgary","latitude":51.0447,"longitude":-114.0719,"population":1547484}'

# Get all cities
curl http://localhost:5002/all

# Get specific city
curl -X POST http://localhost:5002/read \
  -H "Content-Type: application/json" \
  -d '{"key":"1"}'

# Update city
curl -X POST http://localhost:5002/update \
  -H "Content-Type: application/json" \
  -d '{"key":"1","name":"Calgary Updated","population":1600000}'

# Delete city
curl -X POST http://localhost:5002/delete \
  -H "Content-Type: application/json" \
  -d '{"key":"1"}'

# Clear all data
curl http://localhost:5002/clear
```

### Integration with Jest Tests

```javascript
// JavaScript client calls Flask API
import fetch from 'node-fetch';

const url = "http://localhost:5002/";

// Add city
const response = await fetch(url + 'add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        key: "1",
        name: "Calgary",
        latitude: 51.0447,
        longitude: -114.0719,
        population: 1547484
    })
});

// Check status
expect(response.status).toBe(200);
```

### Common Issues & Solutions

**Issue 1: Port Already in Use**
```bash
# Check what's using port 5002
lsof -i :5002

# Kill the process
kill -9 <PID>
```

**Issue 2: CORS Errors**
```
Access to fetch at 'http://localhost:5002/add' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

**Solution**: Ensure `CORS(app)` is in web.py

**Issue 3: Flask Hanging**
```python
# ❌ WRONG: Debug mode with reloader causes hanging
app.run(debug=True, use_reloader=True)

# ✅ CORRECT: Disable for production/testing
app.run(debug=False, use_reloader=False)
```

---

## 2021 vs 2025 Comparison

### Flask Version Changes

**2021: Flask 1.x**
```python
from flask import Flask

app = Flask(__name__)

# Simple CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
```

**2025: Flask 3.x**
```python
from flask import Flask
from flask_cors import CORS  # Dedicated package

app = Flask(__name__)
CORS(app)  # Simpler, more powerful
```

### Error Handling

**2021: Minimal**
```python
@app.route("/add", methods=['POST'])
def add():
    data = request.get_json()
    # No try/catch, no validation
    return jsonify(data)
```

**2025: Comprehensive**
```python
@app.route("/add", methods=['POST'])
def add():
    try:
        data = request.get_json()
        
        # Validate
        if 'key' not in data:
            return jsonify({'error': 'Key required'}), 400
        
        # Process
        result = process_data(data)
        return jsonify(result), 200
        
    except Exception as e:
        traceback.print_stack()
        return jsonify({'error': str(e)}), 500
```

### Data Storage

**2021: In-Memory Dictionary**
```python
data = {}  # Lost on server restart!
```

**2025: Would Use Database**
```python
# PostgreSQL, MongoDB, SQLite
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cities.db'
db = SQLAlchemy(app)

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    ...
```

But for learning, in-memory is fine!

---

## Key Takeaways

### Backend Development Skills

1. **API Design**: RESTful patterns, resource naming
2. **HTTP**: Methods, status codes, headers
3. **CORS**: Understanding cross-origin requests
4. **Error Handling**: Try/catch, status codes, logging
5. **Data Validation**: Check inputs, prevent errors

### Best Practices

**1. Consistent Response Format**
```python
# ✅ GOOD: Always return JSON
return jsonify({'data': result}), 200

# ❌ BAD: Inconsistent types
return "Success"  # String
return {'data': result}  # Dict
```

**2. Proper Status Codes**
```python
# ✅ GOOD: Use appropriate codes
return jsonify({}), 201  # Created
return jsonify({}), 404  # Not Found
return jsonify({}), 500  # Server Error

# ❌ BAD: Always 200
return jsonify({'error': 'Not found'}), 200  # Wrong!
```

**3. Input Validation**
```python
# ✅ GOOD: Validate everything
def add():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data'}), 400
    if 'key' not in data:
        return jsonify({'error': 'Key required'}), 400
    if type(data['key']) != str:
        return jsonify({'error': 'Key must be string'}), 400
```

**4. Error Logging**
```python
# ✅ GOOD: Log errors for debugging
except Exception as e:
    traceback.print_stack()
    print(f'Error in add(): {e}')
    return jsonify({'error': 'Internal server error'}), 500
```

### Security Considerations

1. **Input Sanitization**: Never trust client data
2. **SQL Injection**: Use parameterized queries (when using DB)
3. **Rate Limiting**: Prevent abuse
4. **Authentication**: Protect sensitive endpoints
5. **HTTPS**: Encrypt data in transit

---

## Further Learning

### Next Steps

1. **Add Database**: Replace in-memory storage with SQLite/PostgreSQL
2. **Authentication**: Add user login with JWT tokens
3. **Validation**: Use libraries like Marshmallow
4. **Testing**: Write pytest tests for endpoints
5. **Documentation**: Add Swagger/OpenAPI docs

### Practice Projects

1. **Todo API**: Full CRUD for todo items
2. **Blog API**: Posts, comments, likes
3. **User Management**: Registration, login, profiles
4. **File Upload**: Handle image uploads

### Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

### Next Module

Continue backend exploration with [Module 06: Python Fundamentals](./06-python.md) →

---

**Module Status:** ✅ Complete (Flask server running on port 5002)  
**Key Bugs Fixed:** 2 (clear endpoint, debug mode hanging)  
**Time Investment:** ~3 hours  
**Key Achievement:** Built production-ready RESTful API server!
