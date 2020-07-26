# Comp 250: Exercise - Full Stack

Using all your skills in your kitbag: JavaScript, React.js, PostgreSQL, python, and flask build a Full Stack Application.

You can choose your own application but there must be at least 3 related tables and it must be an SPA (Single Page Application). You could use the same application from the SQL exercise. The application must include some CRUD functionality.

## Prerequisites

* A good understanding of web development (HTML, CSS, JavaScript)
* Basic knowledge of Python and NoSQL database systems
* Familar with Flask framework for front-end development
* Object-oriented Programming (OOP) paradigm
* Model-View-Controller (MVC) paradigm
* Model-View-ViewMode (MVVM) paradigm
* Knowledge and use of the Command-line Interface (CLI)

## Configuration

* Ensure you have Python3, pip, and venv
    - Self-upgrade pip with `python3 -m pip install --upgrade pip`
* Creation of the project folder
* Creation of the virutal environment using `venv`
    - `python3 -m venv env`
    - `. env/bin/activate`
    -  `deactivate` to exit the virtual environment
* Install Flask to virtual enviornment
    - `pip3 install flask`
* Setup enviornment variables
    - `touch .flaskenv` to create the environment variables
    - `pip3 install python-dotenv` will allow enviornment variables to be envoked
* Install the Flask-WTF extension
    - `pip3 install flask-wtf` for web forms within Flask
* Create a `requirements.txt` file for tracking dependencies
    - `pip freeze > requirements.txt`
    - `pip install -r requirements.txt` if installing on a new device/location


## Creating a Flask Project

* Create a `main` module
    - Instaniate a Flask application object
    - Create a default route to display data to the UI
* Run and inspect the application
    - `flask run`
* Creating the project structure
    - Directories for templates, static data, etc.
    - Create an application package `__init__.py`
    - Refactor the `main.py` module
* Running and configuring the development enviornment
    - Create `config.py` and `routes.py`
* Creating the home page of the application
    - Create the template for `index.html`
    - Importating the `render_template` function from the Flask module
    - Usage of the **Jinja** template expression
    - Usage of the `include` directive to include external files
* Creating navigation menus and routing patterns
    - Usage of `url_for` function for resolving links 
    - Usage of `route()` decorator to bind a function to one or more URL patterns
      - Eg. `https://domain.com/`, `https://domain.com/index`, `https://domain.com/home`
    - Usage of Jinga delimiters, eg. `{% ... %}` or `{# ... #}`

## Jinja Templates

* Usage of Jinja's inheritance logic
* Creating the base template
    - Using template inheritance to create child templates 
* Passing data to the view using props
    - Data from the source to the view
    - Using the `For` directive
    - Building tables with JSON data
* Access data via the request and response objects