# EvolveU / InceptionU Full Stack Developer Bootcamp

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.0-green.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.12-yellow.svg)](https://www.python.org/)

> Portfolio of work completed during the 2021 EvolveU / InceptionU Full Stack Developer bootcamp program

## 👋 About

Hi! I'm [**Brennan Brown**](https://github.com/brennanbrown), an EvolveU alumni. This repository showcases the comprehensive curriculum I completed during the full-time bootcamp in Calgary, Alberta.

**Want to hire me?** Check out my [portfolio website](https://brennanbrown.ca) or connect with me on [LinkedIn](https://linkedin.com/in/brennanbrown).

## 📚 Program Overview

The EvolveU / InceptionU Full Stack Developer program blends technology, people, and process skills into one fully integrated experience. The curriculum covers modern web development technologies and frameworks:

### Technologies Learned
- **Frontend:** JavaScript (ES6+), React.js 18, HTML5, CSS3, Bootstrap 5, Material-UI (MUI)
- **Backend:** Python 3.12, Flask 3, RESTful APIs
- **Database:** MongoDB, Mongoose ODM
- **Testing:** Jest, Pytest, React Testing Library
- **Tools:** Git, npm, pipenv, Babel, Webpack

### Soft Skills
- Agile methodologies (daily stand-ups, sprints, retrospectives)
- Critical thinking and problem-solving
- Team collaboration
- Design thinking
- Workplace readiness

## 📂 Repository Structure

This monorepo contains 7 modules, each focusing on different aspects of full-stack development:

### Module 0: Testing Fundamentals
**Directory:** `00-testing/`
- Jest testing framework setup
- Unit testing best practices
- Test coverage analysis
- **Run tests:** `npm test`

### Module 1: JavaScript Basics
**Directory:** `01-getting-started/`
- JavaScript fundamentals and ES6+ syntax
- Control flow and logic
- Functions and scope
- **Run tests:** `npm test`
- **Start dev server:** `npm run serve`

### Module 2: DOM Manipulation
**Directory:** `02-dom/`
- Document Object Model concepts
- Event handling
- Dynamic webpage interaction
- **Run tests:** `npm test`

### Module 3: Object-Oriented Programming
**Directory:** `03-objects/`
- OOP principles (encapsulation, abstraction, inheritance, polymorphism)
- Classes and constructors
- UI controllers and separation of concerns
- **Run tests:** `npm test`

### Module 4: React.js Framework
**Directory:** `04-react/`
Contains 4 progressive React projects:
- **react-00:** React fundamentals
- **react-01:** React hooks and state management
- **react-02:** Material-UI components and Bootstrap integration
- **react-03:** Advanced patterns and context API

Each project includes:
- **Start dev server:** `npm start`
- **Run tests:** `npm test`
- **Build for production:** `npm run build`

### Module 5: API Development
**Directory:** `05-api/`
- RESTful API design
- Flask backend development
- CORS configuration
- Request/response handling
- **Setup:** `pipenv install`
- **Run tests:** `pipenv run pytest`

### Module 6: Python Programming
**Directory:** `06-python/`
- Python fundamentals
- Virtual environments with pipenv
- File I/O operations
- Working with Excel files (OpenPyXL)

### Module 7: Flask & MongoDB
**Directory:** `07-flask/`
- Full-stack Flask application
- MongoDB integration with MongoEngine
- Jinja2 templating
- Flask-Security authentication
- Form handling with WTForms
- **Setup:** `pip install -r requirements.txt`
- **Run tests:** `pytest`

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.12+
- **MongoDB** (for Flask projects)
- **Git**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/brennanbrown/evolveu.git
cd evolveu
```

2. **For JavaScript modules:**
```bash
cd 01-getting-started  # or any JS module
npm install
npm test
```

3. **For Python/Flask modules:**
```bash
cd 05-api  # or 07-flask
pipenv install  # or pip install -r requirements.txt
pipenv run pytest  # run tests
```

4. **For React projects:**
```bash
cd 04-react/react-03  # or any react-xx directory
npm install
npm start  # starts dev server on http://localhost:3000
```

## 🔧 Available Scripts

### JavaScript/React Projects
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm start` - Start development server (React projects)
- `npm run build` - Build for production (React projects)

### Python Projects
- `pytest` - Run all tests
- `pytest --cov` - Run tests with coverage
- `pipenv install` - Install dependencies
- `python app.py` - Run Flask application

## 📦 Dependencies Update (2025)

This repository has been updated with the latest stable versions:

### JavaScript
- **React:** 16.x → 18.3.1
- **Jest:** 29.7.0
- **Testing Library:** Latest versions
- **Material-UI:** v4 → MUI v6
- **Bootstrap:** 4.x → 5.3.3

### Python
- **Flask:** 2.x → 3.1.0
- **Python:** 3.8 → 3.12
- **All dependencies:** Updated to latest stable versions

## 🌐 Live Demonstrations

**Note:** The original Heroku deployments may no longer be active. To view the projects:

1. Clone this repository
2. Follow the installation instructions above
3. Run the projects locally

**Original deployment links:**
- React Site: `https://react-brennan.herokuapp.com/` ([Source](https://github.com/brennanbrown/evolveu/tree/react))
- Flask Site: `https://flask-brennan.herokuapp.com/` ([Source](https://github.com/brennanbrown/evolveu/tree/flask))

## 🧪 Running Tests

All modules include comprehensive test suites:

```bash
# JavaScript modules
npm test

# Python modules
pytest
pytest --cov  # with coverage
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

While this is a personal learning portfolio, suggestions and improvements are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📧 Contact

**Brennan Brown**
- Website: [brennanbrown.ca](https://brennanbrown.ca)
- GitHub: [@brennanbrown](https://github.com/brennanbrown)
- LinkedIn: [brennankbrown](https://linkedin.com/in/brennankbrown)

## 🙏 Acknowledgments

- **EvolveU / InceptionU** for the comprehensive curriculum
- All instructors and mentors who supported my learning journey
- Fellow bootcamp participants for collaboration and peer learning

---

*This repository represents work completed in 2021 and has been updated with modern dependencies in 2025 to maintain compatibility and security.*
