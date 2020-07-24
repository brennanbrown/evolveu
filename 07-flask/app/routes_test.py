from app import routes
import pytest

def test_canRoutesBeCalled():
    output = routes.test_function()
    if (output == "Success!"):
        assert True
    else:
        assert False