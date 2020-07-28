from app import app, db
from flask import render_template, request, Response, json, redirect, flash
from app.models import User, Course, Enrollment
from app.forms import LoginForm, RegisterForm

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

# Decorate the underlying definition or function
@app.route("/")
@app.route("/index")
@app.route("/home")
def Index():
    index_page = render_template("index.html", index = True)
    return index_page

@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if request.form.get("email") == "test@flaskschool.com":
            flash("You are successfully logged in!", "success")
            return redirect("/index")
        else:
            flash("Sorry! Something went wrong. Try again.", "danger")
    login_page = render_template(
        "login.html", 
        title="Login", 
        form = form, 
        login = True)
    return login_page

@app.route("/courses/")
@app.route("/courses/<term>")
def courses(term = "Autumn 2020"):
    courses_page = render_template(
        "courses.html", 
        course_data = course_data, 
        courses = True, 
        term = term)
    return courses_page

@app.route("/register")
def register():
    register_page = render_template("register.html", register = True)
    return register_page

@app.route("/enrollment", methods=["GET", "POST"])
def enrollment():
    id = request.form.get("courseID")
    title = request.form.get("title")
    term = request.form.get("term")
    enrollment_page = render_template(
        "enrollment.html", 
        enrollment = True, 
        data={"id":id, "title":title, "term":term})
    return enrollment_page

@app.route("/api/")
@app.route("/api/<idx>")
# If no index, default to /api/
def api(idx=None):
    if (idx == None):
        j_data = course_data
    else:
        j_data = course_data[int(idx)]
    
    return Response(
        json.dumps(j_data), 
        mimetype="application/json")

# Display DB via the browser:
@app.route("/user")
def user():
    users = User.objects.all()
    user_page = render_template("user.html", users=users)
    return user_page

def test_function():
    return "Success!"