from app import app
from flask import render_template

# Decorate the underlying definition or function
@app.route("/")
@app.route("/index")
@app.route("/home")
def Index():
    index_page = render_template("index.html", index = True)
    return index_page

@app.route("/login")
def login():
    login_page = render_template("login.html", login = True)
    return login_page

@app.route("/courses")
def courses():
    course_data = [
        {
            "courseID": "1111",
            "title": "PYT 101",
            "description": "Introduction to Python",
            "credits": "3",
            "term": "Fall, Spring"
        
        },
        {
            "courseID": "2222",
            "title": "JAV 201",
            "description": "Intermediate Java Programming",
            "credits": "4",
            "term": "Spring"
        
        },
        {
            "courseID": "3333",
            "title": "PHP 202",
            "description": "Advanced PHP Programming",
            "credits": "4",
            "term": "Fall"
        
        },
        {
            "courseID": "4444",
            "title": "ANG 101",
            "description": "Introduction to Angular",
            "credits": "3",
            "term": "Fall, Spring"
        
        },
        {
            "courseID": "5555",
            "title": "JAV 301",
            "description": "Advanced Java Programming",
            "credits": "4",
            "term": "Fall"
        
        }
    ]
    courses_page = render_template("courses.html", course_data = course_data, courses = True)
    return courses_page

@app.route("/register")
def register():
    register_page = render_template("register.html", register = True)
    return register_page

def test_function():
    return "Success!"