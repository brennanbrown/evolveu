from app import routes
import pytest

def test_canRoutesBeCalled():
    output = routes.Index()
    if (output == "<h1>Hello, world!</h1>"):
        assert True
    else:
        assert False