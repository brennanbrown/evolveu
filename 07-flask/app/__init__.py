from flask import Flask
from config import Config
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config.from_object(Config)

db = MongoEngine()
db.init_app(app)

from app.models import Course, User

with app.app_context():
    if not Course.objects.first():
        Course(courseID="C101", title="Intro to Flask", description="Build web apps with Flask", credits=3, term="Autumn 2026").save()
        Course(courseID="C102", title="Full-Stack with Flask", description="Flask, MongoDB, and deployment", credits=4, term="Autumn 2026").save()
        Course(courseID="C103", title="Web Security", description="Authentication, CORS, and safe deployments", credits=3, term="Autumn 2026").save()
    if not User.objects.first():
        demo = User(user_id=1, first_name="Demo", last_name="User", email="demo@flaskschool.com")
        demo.set_password("password1")
        demo.save()

from app import routes