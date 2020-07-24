from app import app
from flask import render_template

# Decorate the underlying definition or function
@app.route("/")
@app.route("/index")
@app.route("/home")
def Index():
    index_page = render_template("index.html", login=True)
    return index_page

@app.route("/home")
def index():
    index_page = render_template("index.html", login=True)
    return index_page

@app.route("/login")
def login():
    index_page = render_template("login.html", login=True)
    return index_page

@app.route("/courses")
def courses():
    courses_page = render_template("courses.html", login=True)
    return courses_page

@app.route("/register")
def register():
    register_page = render_template("register.html", login=True)
    return register_page

def test_function():
    return "Success!"