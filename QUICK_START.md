# Quick Start Guide

Get up and running with any module in this bootcamp portfolio quickly.

## 🎯 Choose Your Module

```bash
# Clone the repository
git clone https://github.com/brennanbrown/evolveu.git
cd evolveu
```

## 📦 JavaScript/Testing Modules

### Modules: 00-testing, 01-getting-started, 02-dom, 03-objects

```bash
# Navigate to module
cd 01-getting-started  # or any module

# Install dependencies
npm install

# Run tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Live Server (01-getting-started only):**
```bash
npm run serve  # Opens http://localhost:8080
```

## ⚛️ React Projects

### Modules: 04-react/react-00, react-01, react-02, react-03

```bash
# Navigate to React project
cd 04-react/react-03  # or react-00, react-01, react-02

# Install dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000

# Run tests in watch mode
npm test

# Build for production
npm run build
```

**First Time Setup:**
If you see errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🐍 Python/Flask Projects

### Module: 05-api (API Development)

```bash
# Navigate to API module
cd 05-api

# Install dependencies
pipenv install

# Activate virtual environment
pipenv shell

# Run tests
pytest

# Run with coverage
pytest --cov

# Start Flask app (if applicable)
python app.py
```

**Without pipenv:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pytest
```

### Module: 07-flask (Full Stack)

```bash
# Navigate to Flask module
cd 07-flask

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (create .env file)
echo "FLASK_APP=app.py" > .env
echo "FLASK_ENV=development" >> .env
echo "SECRET_KEY=your-secret-key-here" >> .env

# Run tests
pytest

# Start Flask app
flask run
# Opens http://localhost:5000
```

**With MongoDB:**
Ensure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check if running
mongosh  # MongoDB shell
```

## 🔧 Common Commands

### Check Versions
```bash
# Node.js (should be 18+)
node --version

# Python (should be 3.12+)
python --version

# npm
npm --version

# MongoDB
mongod --version
```

### Update Dependencies

**JavaScript:**
```bash
npm update
npm audit fix  # Fix security issues
```

**Python:**
```bash
pip install --upgrade -r requirements.txt
pipenv update  # If using pipenv
```

## ❗ Troubleshooting

### JavaScript Issues

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

**Jest errors**
```bash
npm test -- --clearCache
npm test
```

### Python Issues

**ModuleNotFoundError**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # or pipenv shell

# Reinstall dependencies
pip install -r requirements.txt
```

**MongoDB connection error**
```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

**Port 5000 conflicts**
```bash
# Use a different port
flask run --port=5001
```

## 📚 Module-Specific Notes

### 00-testing
- Focus: Jest testing fundamentals
- No live server needed
- All work is in test files

### 01-getting-started
- Focus: JavaScript basics
- Use `npm run serve` to view HTML pages
- Tests cover basic logic functions

### 02-dom
- Focus: DOM manipulation
- Open HTML files in browser
- Tests use jsdom environment

### 03-objects
- Focus: Object-oriented programming
- Classes, inheritance, polymorphism
- MVC pattern examples

### 04-react/react-00
- Basic React components
- Props and state
- No external UI libraries

### 04-react/react-01
- React hooks (useState, useEffect)
- Component lifecycle
- Advanced state management

### 04-react/react-02
- Material-UI (MUI v6)
- Bootstrap 5
- Styled components
- Most complex styling examples

### 04-react/react-03
- Context API
- Advanced patterns
- Data structures (Linked Lists, Stacks, Queues)

### 05-api
- Flask REST API
- CORS configuration
- Request/response handling
- Python testing with pytest

### 06-python
- Python fundamentals
- File I/O
- Excel manipulation with openpyxl
- pipenv virtual environments

### 07-flask
- Full-stack Flask application
- MongoDB integration
- Authentication with Flask-Security-Too
- Jinja2 templating
- WTForms

## 🚀 Next Steps

1. **Pick a module** that interests you
2. **Follow the setup** steps above
3. **Run the tests** to ensure everything works
4. **Explore the code** and documentation
5. **Make changes** and see results

## 📖 Additional Documentation

- [README.md](README.md) - Full project overview
- [MIGRATION.md](MIGRATION.md) - 2021 → 2025 changes
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [SECURITY.md](SECURITY.md) - Security policy
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 💡 Tips

- **Start simple**: Begin with 01-getting-started if new to the stack
- **Read tests**: Tests often show how to use the code
- **Use watch mode**: Auto-rerun tests as you code
- **Check console**: Browser/terminal output helps debug
- **Read docs**: Each module may have its own README

## 📧 Need Help?

- Check [existing issues](https://github.com/brennanbrown/evolveu/issues)
- Read the [MIGRATION.md](MIGRATION.md) guide
- Open a new issue with details
- Contact [@brennanbrown](https://github.com/brennanbrown)

---

**Happy coding! 🎉**
