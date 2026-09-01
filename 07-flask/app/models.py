from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Document):
    user_id    = db.IntField( unique=True, required=True )
    first_name = db.StringField( max_length=50, required=True )
    last_name  = db.StringField( max_length=50, required=True )
    email      = db.StringField( max_length=100, unique=True, required=True )
    password   = db.StringField( required=True )

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)    

class Course(db.Document):
    courseID    = db.StringField( max_length=5, unique=True )
    title       = db.StringField( max_length=100 )
    description = db.StringField( max_length=255 )
    credits     = db.IntField()
    term        = db.StringField( max_length=25 )

class Enrollment(db.Document):
    user_id     = db.IntField()
    courseID    = db.StringField( max_length=5 )