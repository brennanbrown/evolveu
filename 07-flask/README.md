# Comp 250: Exercise - Full Stack

- [Comp 250: Exercise - Full Stack](#comp-250-exercise---full-stack)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Creating a Flask Project](#creating-a-flask-project)
    - [Jinja Templates](#jinja-templates)
  - [Data and Objects](#data-and-objects)
  - [Database Configuration](#database-configuration)
  - [Web Forms and Security](#web-forms-and-security)

Using all your skills in your kitbag: JavaScript, React.js, MongoDB, Python, and Flask build a Full Stack Application.

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

### Jinja Templates

* Usage of Jinja's inheritance logic
* Creating the base template
    - Using template inheritance to create child templates 
* Passing data to the view using props
    - Data from the source to the view
    - Using the `For` directive
    - Building tables with JSON data
* Access data via the request and response objects
    - URL variables
    - HTTP Methods (GET, POST)
    - Global Objects: Request and Response (JSON API Format)

## Data and Objects

**Request Object:**

* Accessing Query String (GET)
    - `request.args.get(<field_name>)`
        - If you put a get function and you get something from the curly string and, if that ID with that token is not there, then you will get a message saying none, so it doesn't crash your site. 
    - `request.args[<field_name>]`
        - If you're using the array method, that means you're very specific and assuming you will guarantee that that variable has to be there; if it's not, it'll crash the site, so you don't want that as well.
* Accessing Form Data (POST)
    - `request.form.get(<field_name>)`
    - `request.form[<field_name>]`

**Response Object:**

The Response object is usually used for creating APIs and Flask has this class of response that gives you six parameters that you can use:

```python
class flask.Response(
    # Most commonly used parameters:
    response = None,
    mimetype = None,
    content_type = None,
    
    status = None,
    headers = None,
    direct_passthrough = False)
```

**URL Variables:**

* Routing patterns (Eg. `domain.com/page/variable`)
* Creating a URL variable
* Setting default data to a URL variable
* Passing a URL variable to a template

**GET Method:**

* Create forms using the GET method
* Create the form template
* Create the form route (URL pattern)
* Accesssing form data via the GET method

**POST Method:**

* Updating the enrollment form using POST method
* Adding the GET and POST methods to route
* Acessing form data using the form object

## Database Configuration

> See: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ and https://www.mongodb.com/try/download/compass

* Utilize the MongoDB database system with Flask
    - `sudo systemctl start mongod` 
    - `mongodb-compass`
    - `pip install flask-mongoengine`
    - Update `requirements.txt`: `pip freeze > requirements.txt`
* Set up and connect to the new database:
    - Import the newly installed MongoEngine: `From flask_mongoengine import MongoEngine` 
    - Set up a MongoDB database: `MONGODB_SETTINGS = { "db" : "DATABASE_NAME" }` 
    - Initialize the database object: `db = Mongo Engine(); db.init_app(app)`
* Connecting to the database:
    - Connecting to the MongoDB via the MongoEngine object
    - Intergrate a user collection using a user model class
    - Insert sample user document (data) to a collection
    - Display the collection back to the view
* Creating the documents and data:
    - Insert documents within the collections
    - Use of MongoDB shell commands:
        - Create collections (tables): `db.createCollection( <collection> )`
        - Insert an entry into a collection: `db.<collection>.insert( { ... } )`
        - Insert multiple entries into a collection: `db.<collection>.insertMany( {...} )`
    - Insert JSON data using the `mongoexport.exe` via the command line:
        - `mongoimport --db <DB> -collection <collection> --file <file>`
        - Shortcut version: `mongoimport --d <DB> -c <collection> --file <file>`
* Creating the data models:
    - Models for each collection (Eg. User, Courses, Enrollment, etc.)

```python
class ModelName(db.Document):
    field1 = db.IntField()
    field2 = db.StringField()
    # ...
    fieldn = db.StringField()
```

## Web Forms and Security

* Install and configure Flask-WTF and Flask-Security extensions:
    - Flask-WTF is an extension for the WTForms Library
        - WTForms provides a clean way to generate HTML form fields
        - In addition, maintains a separation of code and presentation (similar to MVC)
        - `pip install flask-wtf`
    - Flask-Security provides common security and authentication features:
        - Session-bassed authentication
        - Password hashing
        - Basic HTTP and token-based authentications
        - User registration and login tracking (w/ Flask-Login)
        - Supports data persistency for Flask-SQLAlchemy, Flask-MongoEngine, flask-peewee, and PonyORM
        - `pip install flask-security`

```python
# Example login.html in Jinja:
<form>
    # Generates a CSRF token.
    {{ form.hidden_tag() }}
    {{ form.username }}
    {{ form.email    }}
    {{ form.password }}
</form>

# Example forms.py
class LoginForm(FlaskForm):
    email = StringField('Email')
    password = StringField('Password')
    submit = SubmitField('Login')
```

* Creating the login and registration pages
    - Creation of form classes and updating the templates using the WTForms library
    - Creation of alert messages using the `flash()` method
    - Validation of forms and displaying error messages via form
    - Update the login route to capture form data
* Processing form data and updating the database
* Creating the courses and enrollment pages
* Creating sessions and user authentication