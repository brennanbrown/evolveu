import os

class Config(object):
    # Ensures no files being passed have been altered
    # If altered, will be disregarded
    SECRET_KEY = os.environ.get("SECRET_KEY") or b"\x1c=\xb2\xfa?\xbcn\x91K\x9c\xe7=\x8c\xa5i\xff"

    MONGODB_SETTINGS = { "db" : "FLASK_Enrollment",
        "host" : "mongodb://localhost:27017/FLASK_Enrollment"
    }