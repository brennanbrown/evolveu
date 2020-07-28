from app import app, db
from flask import render_template, request, Response, json, redirect, flash, url_for, session
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

# Decorates the underlying definition or function.
@app.route("/")
@app.route("/index")
@app.route("/home")
def Index():
    index_page = render_template("index.html", index = True)
    return index_page

@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get("username"):
        return redirect(url_for("Index"))
    form = LoginForm()
    if form.validate_on_submit():
        email    = form.email.data
        password = form.password.data
        # Compares the form email to the database.
        # .first() will only return a single object,
        # not the entire array.
        user = User.objects(email = email).first()
        # Retrieves the hashed password:
        if (user and user.get_password(password)):
            flash(f"{user.first_name}, you are successfully logged in!", "success")
            session["user_id"] = user.user_id
            session["username"] = user.first_name
            return redirect("/index")
        else:
            flash("Sorry, something went wrong.","danger")
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

@app.route("/register", methods=["POST", "GET"])
def register():
    if session.get("username"):
        return redirect(url_for("Index"))
    form = RegisterForm()
    if form.validate_on_submit():
        # Determines the ID by counting
        # amount of current entries,
        # and then just adds one.
        user_id  = User.objects.count()
        user_id += 1

        email      = form.email.data
        password   = form.password.data
        first_name = form.first_name.data
        last_name  = form.last_name.data

        # Adds the properties to the new entry.
        user = User(
            user_id = user_id,
            email = email, 
            first_name = first_name, 
            last_name = last_name)
        user.set_password(password)

        # Saves new entry to database.
        user.save()
        flash("You are successfully registered!","success")
        return redirect(url_for("Index"))
    register_page = render_template(
        "register.html", 
        title = "Register", 
        form = form, 
        register = True)
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