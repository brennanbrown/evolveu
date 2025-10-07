# Module 07: Flask Full-Stack Application

**Learning Focus:** Production Flask apps, MongoDB integration, authentication, and deployment

## Table of Contents
1. [Module Overview](#module-overview)
2. [Architecture Overview](#architecture-overview)
3. [Core Concepts](#core-concepts)
4. [Challenges & Learnings](#challenges--learnings)
5. [Key Takeaways](#key-takeaways)

---

## Module Overview

### What We're Building

A **production-ready Flask application** with:
- MongoDB database integration
- User authentication & authorization
- RESTful API endpoints
- Security best practices
- Deployment configuration (Heroku)

### Current Status

⚠️ **Note**: This module has dependency compatibility issues discovered during the 2025 audit:

```
ImportError: cannot import name 'JSONEncoder' from 'flask.json'
```

**Root cause**: `flask-mongoengine 1.0.0` is incompatible with Flask 3.x

**Workaround**: Use Flask 2.x or wait for flask-mongoengine update

---

## Architecture Overview

### Project Structure

```
07-flask/
├── app/
│   ├── __init__.py           # App factory
│   ├── models.py             # Database models
│   ├── routes.py             # Route handlers
│   ├── routes_test.py        # Route tests
│   ├── forms.py              # WTForms
│   ├── templates/            # Jinja2 templates
│   └── static/               # CSS, JS, images
├── models/
│   └── ...                   # Additional models
├── config.py                 # Configuration
├── main.py                   # Entry point
├── requirements.txt          # Dependencies
├── .flaskenv                 # Environment variables
├── Procfile                  # Heroku deployment
└── README.md
```

### Technology Stack

```
Frontend:
  └── Jinja2 templates
  └── HTML/CSS/JavaScript

Backend:
  └── Flask 3.x (Python web framework)
  └── Flask-Login (authentication)
  └── Flask-WTF (forms)
  └── Flask-CORS (cross-origin)

Database:
  └── MongoDB (NoSQL database)
  └── MongoEngine (ODM - Object Document Mapper)

Deployment:
  └── Heroku (PaaS platform)
  └── Gunicorn (WSGI server)
```

---

## Core Concepts

### 1. Application Factory Pattern

**Problem**: Direct app instantiation makes testing difficult

```python
# ❌ BAD: Global app instance
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello'

if __name__ == '__main__':
    app.run()
```

**Solution**: Factory function creates app

```python
# ✅ GOOD: Factory pattern (app/__init__.py)
from flask import Flask
from flask_mongoengine import MongoEngine

db = MongoEngine()

def create_app(config_name='default'):
    """
    Application factory function
    
    Args:
        config_name: Configuration to use (dev, test, prod)
    
    Returns:
        Configured Flask app
    """
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(f'config.{config_name}')
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)
    
    return app
```

**Benefits**:
- Multiple app instances for testing
- Different configs (dev, test, prod)
- Delayed initialization
- Better separation of concerns

### 2. MongoDB & MongoEngine

**Traditional SQL** (PostgreSQL, MySQL):
```sql
-- Structured tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

-- Rigid schema
INSERT INTO users (username, email) VALUES ('brennan', 'b@example.com');
```

**NoSQL MongoDB**:
```javascript
// Flexible documents
{
    "_id": ObjectId("..."),
    "username": "brennan",
    "email": "b@example.com",
    "profile": {
        "age": 25,
        "city": "Calgary"
    },
    "tags": ["developer", "student"]
}

// No fixed schema!
```

**MongoEngine ODM**:
```python
from mongoengine import Document, StringField, IntField

class User(Document):
    """
    User model - maps to MongoDB collection
    """
    username = StringField(required=True, unique=True, max_length=50)
    email = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    
    # OOP methods
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Usage
user = User(username='brennan', email='b@example.com')
user.set_password('secret123')
user.save()  # Saves to MongoDB

# Query
user = User.objects(username='brennan').first()
```

### 3. Authentication with Flask-Login

```python
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required

# Setup
login_manager = LoginManager()
login_manager.init_app(app)

# User loader callback
@login_manager.user_loader
def load_user(user_id):
    return User.objects(id=user_id).first()

# Login route
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    
    user = User.objects(username=username).first()
    
    if user and user.check_password(password):
        login_user(user)  # Creates session
        return redirect('/dashboard')
    
    return 'Invalid credentials', 401

# Protected route
@app.route('/dashboard')
@login_required  # Decorator requires authentication
def dashboard():
    return f'Welcome {current_user.username}'

# Logout
@app.route('/logout')
@login_required
def logout():
    logout_user()  # Destroys session
    return redirect('/')
```

### 4. Environment Configuration

```python
# config.py
import os

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    MONGODB_SETTINGS = {
        'db': 'myapp',
        'host': 'localhost',
        'port': 27017
    }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = False
    TESTING = True
    MONGODB_SETTINGS = {
        'db': 'myapp_test',
        'host': 'localhost',
        'port': 27017
    }

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        'db': os.environ.get('MONGODB_DB'),
        'host': os.environ.get('MONGODB_URI'),
        'username': os.environ.get('MONGODB_USER'),
        'password': os.environ.get('MONGODB_PASSWORD')
    }

# Map config names to classes
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

---

## Code Examples

### models.py - Database Models

```python
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Document):
    """User model"""
    user_id = db.IntField(required=True, unique=True)
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)
    email = db.StringField(required=True, unique=True, max_length=100)
    password = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'users',
        'indexes': ['user_id', 'email']
    }
    
    def set_password(self, password):
        """Hash and store password"""
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        """Verify password"""
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return f'<User {self.email}>'


class Course(db.Document):
    """Course model"""
    course_id = db.IntField(required=True, unique=True)
    course_name = db.StringField(required=True, max_length=100)
    instructor = db.StringField(max_length=100)
    credits = db.IntField(min_value=1, max_value=10)
    
    meta = {
        'collection': 'courses',
        'indexes': ['course_id']
    }
    
    def __repr__(self):
        return f'<Course {self.course_name}>'


class Enrollment(db.Document):
    """Enrollment (Many-to-Many relationship)"""
    user = db.ReferenceField(User, required=True)
    course = db.ReferenceField(Course, required=True)
    enrolled_at = db.DateTimeField(default=datetime.utcnow)
    grade = db.StringField(max_length=2)
    
    meta = {
        'collection': 'enrollments',
        'indexes': [
            ('user', 'course')  # Compound index
        ]
    }
    
    def __repr__(self):
        return f'<Enrollment {self.user.email} - {self.course.course_name}>'
```

### routes.py - API Endpoints

```python
from flask import Blueprint, request, jsonify
from app.models import User, Course, Enrollment
from flask_login import login_required, current_user

main_bp = Blueprint('main', __name__)

def test_function():
    """Test function for basic route testing"""
    return "Success!"

@main_bp.route('/api/users', methods=['GET'])
def get_users():
    """Get all users"""
    users = User.objects.all()
    return jsonify([{
        'user_id': u.user_id,
        'first_name': u.first_name,
        'last_name': u.last_name,
        'email': u.email
    } for u in users]), 200


@main_bp.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get specific user"""
    user = User.objects(user_id=user_id).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    }), 200


@main_bp.route('/api/users', methods=['POST'])
def create_user():
    """Create new user"""
    data = request.get_json()
    
    # Validation
    required = ['user_id', 'first_name', 'last_name', 'email', 'password']
    if not all(field in data for field in required):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if user exists
    if User.objects(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    # Create user
    user = User(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email']
    )
    user.set_password(data['password'])
    user.save()
    
    return jsonify({'message': 'User created', 'user_id': user.user_id}), 201


@main_bp.route('/api/enroll', methods=['POST'])
@login_required  # Must be logged in
def enroll():
    """Enroll user in course"""
    data = request.get_json()
    
    course_id = data.get('course_id')
    course = Course.objects(course_id=course_id).first()
    
    if not course:
        return jsonify({'error': 'Course not found'}), 404
    
    # Check if already enrolled
    existing = Enrollment.objects(
        user=current_user.id,
        course=course.id
    ).first()
    
    if existing:
        return jsonify({'error': 'Already enrolled'}), 400
    
    # Create enrollment
    enrollment = Enrollment(user=current_user.id, course=course.id)
    enrollment.save()
    
    return jsonify({'message': 'Enrolled successfully'}), 201
```

### routes_test.py - Testing

```python
from app import routes
from app.models import User, Course, Enrollment
import pytest

def test_canRoutesBeCalled():
    """Test basic route functionality"""
    output = routes.test_function()
    assert output == "Success!"

def mock_users():
    """Create mock users for testing"""
    User(
        user_id=1,
        first_name="Jane",
        last_name="Testname",
        email="jane_testname@flaskschool.com",
        password="fake_password1"
    ).save()
    
    User(
        user_id=2,
        first_name="John",
        last_name="Testname",
        email="john_testname@flaskschool.com",
        password="fake_password2"
    ).save()

# More tests would go here...
```

---

## Challenges & Learnings

### Challenge 1: Dependency Compatibility

**Problem**: Flask 3.x changed internal structure, breaking flask-mongoengine

```python
# flask-mongoengine tries to import:
from flask.json import JSONEncoder  # Doesn't exist in Flask 3.x!
```

**Solutions**:
1. Downgrade to Flask 2.x
2. Wait for flask-mongoengine update
3. Switch to PyMongo directly
4. Use SQLAlchemy instead

**Lesson**: Always check dependency compatibility in `requirements.txt`

### Challenge 2: MongoDB Setup

**Problem**: MongoDB must be running locally or in cloud

```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongo --eval "db.stats()"
```

**Cloud Alternative**: MongoDB Atlas (free tier)

### Challenge 3: Environment Variables

**Problem**: Secrets shouldn't be in code

```python
# ❌ BAD: Hardcoded secrets
MONGODB_URI = "mongodb://user:password@host:27017/db"
SECRET_KEY = "my-secret-key-123"

# ✅ GOOD: Use environment variables
MONGODB_URI = os.environ.get('MONGODB_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')
```

**Solution**: Use `.env` file (don't commit!)

```bash
# .env (add to .gitignore!)
MONGODB_URI=mongodb://localhost:27017/myapp
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
```

---

## Key Takeaways

### Production Checklist

- [ ] Environment-based configuration
- [ ] Secrets in environment variables
- [ ] Database migrations handled
- [ ] Error handling & logging
- [ ] Input validation & sanitization
- [ ] Authentication & authorization
- [ ] HTTPS in production
- [ ] Rate limiting
- [ ] Database backups
- [ ] Monitoring & alerts

### Best Practices

**1. Blueprints for Organization**
```python
# Organize routes by feature
app/
├── auth/              # Authentication routes
│   └── routes.py
├── api/               # API routes
│   └── routes.py
└── admin/             # Admin routes
    └── routes.py
```

**2. Database Indexes**
```python
class User(db.Document):
    email = db.StringField(required=True, unique=True)
    
    meta = {
        'indexes': [
            'email',  # Single field index
            ('first_name', 'last_name')  # Compound index
        ]
    }
```

**3. Error Handling**
```python
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()  # Rollback any failed transactions
    return jsonify({'error': 'Internal server error'}), 500
```

### Security Considerations

1. **Password Hashing**: Never store plain passwords
2. **CSRF Protection**: Use Flask-WTF
3. **SQL Injection**: Use parameterized queries (ORM does this)
4. **XSS**: Escape user input
5. **Rate Limiting**: Prevent brute force
6. **HTTPS**: Encrypt data in transit

---

## Further Learning

### Next Steps

1. **Complete Module**: Fix dependency issues, run tests
2. **Add Features**: User profiles, password reset, email verification
3. **Deploy**: Heroku, AWS, or DigitalOcean
4. **Scale**: Add caching (Redis), load balancing

### Resources

- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [MongoDB University](https://university.mongodb.com/)
- [Flask-Login Docs](https://flask-login.readthedocs.io/)
- [12 Factor App](https://12factor.net/)

### Real-World Applications

- **SaaS Platforms**: User management, subscriptions
- **E-commerce**: Product catalogs, orders
- **Social Networks**: Posts, comments, likes
- **APIs**: Public/private data access

---

## Conclusion

Module 07 represents the culmination of the bootcamp—a **production-grade full-stack application**. While we encountered compatibility issues during the 2025 audit, the architectural patterns and concepts remain valuable:

- Application factory pattern
- Database ORM/ODM
- Authentication & authorization
- RESTful API design
- Production configuration
- Deployment strategies

These patterns transfer to **any** web framework, whether Flask, Django, FastAPI, Express, or Rails.

---

**Module Status:** ⚠️ Blocked (dependency issues)  
**Key Concepts:** Factory pattern, MongoDB, authentication  
**Time Investment:** ~4 hours (setup + learning)  
**Key Achievement:** Understanding production-grade Flask architecture!

---

**🎓 Bootcamp Complete!** Return to [Documentation Index](./README.md)
