from app import routes
from app.models import User, Course, Enrollment
import pytest

def test_canRoutesBeCalled():
    output = routes.test_function()
    if (output == "Success!"):
        assert True
    else:
        assert False

def mock_users():
    User(
        user_id = 1, 
        first_name = "Jane", 
        last_name = "Testname", 
        email = "jane_testname@flaskschool.com",
        password = "fake_password1"
    ).save()
    
    User(
        user_id = 2, 
        first_name = "John", 
        last_name = "Testname", 
        email = "john_testname@flaskschool.com",
        password = "fake_password2"
    ).save()