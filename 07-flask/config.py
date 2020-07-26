import os

class Config(object):
    # Ensures no files being passed have been altered
    # If altered, will be disregarded
    SECRET_KEY = os.environ.get("SECRET_KEY") or "fake_secret_string"

    MONGODB_SETTINGS = { "db" : "FLASK_Enrollment",
        "host" : "mongodb://localhost:27017/FLASK_Enrollment"
    }