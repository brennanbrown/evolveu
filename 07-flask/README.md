# Comp 250: Exercise - Full Stack

Using all your skills in your kitbag: JavaScript, React.js, PostgreSQL, python, and flask build a Full Stack Application.

You can choose your own application but there must be at least 3 related tables and it must be an SPA (Single Page Application). You could use the same application from the SQL exercise. The application must include some CRUD functionality.

## Prerequisites

* A good understanding of web development (HTML, CSS, JavaScript)
* Basic knowledge of Pythin and NoSQL database systems
* Familar with Flask framework for front-end development
* Object-oriented Programming (OOP) paradigm
* Model-View-Controller (MVC) paradigm
* Model-View-ViewMode (MVVM) paradigm
* Knowledge and use of the Command-line Interface (CLI)

## Configuration

* Ensure you have Python3, pip, and venv
    - Self-upgrade pip with `python3 -m pip install --upgrade pip`
* Creation of the project folder
* Creation of the virutal enviornment using `venv`
    - `python3 -m venv env`
    - `. env/bin/activate`
    -  `deactivate` to exit the virtual enviornment
* Install Flask to virtual enviornment
    - `pip3 install flask`
* Setup enviornment variables
    - `touch .flaskenv` to create the enviornment variables
    - `pip3 install python-dotenv` will allow enviornment variables to be envoked
* Install the Flask-WTF extension
    - `pip3 install flask-wtf` for web forms within Flask
* Create a `requirements.txt` file for tracking dependencies
    - `pip freeze > requirements.txt`
    - `pip install -r requirements.txt` if installing on a new device/location

### Simple Flask Application

* Create a `main` module
    - Instaniate a Flask application object
    - Create a default route to display data to the UI
* Run and inspect the application
    - `flask run`

## Creating a Flask Project

* Creating the project structure
    - Directories for templates, static data, etc.
    - Create an application package `__init__.py`
    - Refactor the `main.py` module
* Running and configuring the development enviornment
* Creating the home page of the application
* Creating navigation menus and routing patterns