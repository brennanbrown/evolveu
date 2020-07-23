from flask import Flask

app = Flask(__name__)

# Decorate the underlying definition or function
@app.route("/")
@app.route("/index")
def index():
    return "<h1>Hello, world!</h1>"