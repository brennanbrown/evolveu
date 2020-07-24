import os

class Config(object):
    # Ensures no files being passed have been altered
    # If altered, will be disregarded
    SECRET_KY = os.environ.get("SECRET_KEY") or "fake_secret_string"