from app import app

# Decorate the underlying definition or function
@app.route("/")
@app.route("/index")
def Index():
    return "<h1>Hello, world!</h1>"