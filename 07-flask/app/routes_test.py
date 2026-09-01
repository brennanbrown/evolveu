import pytest
from app import app
from app import routes
from app.models import Course, User


def _seed_db():
    Course.objects.delete()
    User.objects.delete()

    Course(courseID="C101", title="Intro to Flask", description="Build web apps with Flask", credits=3, term="Autumn 2026").save()
    Course(courseID="C102", title="Full-Stack with Flask", description="Flask, MongoDB, and deployment", credits=4, term="Autumn 2026").save()
    Course(courseID="C103", title="Web Security", description="Authentication, CORS, and safe deployments", credits=3, term="Autumn 2026").save()

    demo = User(user_id=1, first_name="Demo", last_name="User", email="demo@flaskschool.com")
    demo.set_password("password1")
    demo.save()


@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    with app.app_context():
        _seed_db()
        with app.test_client() as client:
            yield client


def test_canRoutesBeCalled():
    output = routes.test_function()
    assert output == "Success!"


def test_index(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'Welcome' in rv.data


def test_courses(client):
    rv = client.get('/courses/')
    assert rv.status_code == 200
    assert b'Intro to Flask' in rv.data


def test_api_all(client):
    rv = client.get('/api/')
    assert rv.status_code == 200
    data = rv.get_json()
    assert isinstance(data, list)
    assert len(data) == 3
    assert data[0]['courseID'] == 'C101'


def test_api_course_found(client):
    rv = client.get('/api/C101')
    assert rv.status_code == 200
    data = rv.get_json()
    assert data['courseID'] == 'C101'


def test_api_course_not_found(client):
    rv = client.get('/api/NONEXISTENT')
    assert rv.status_code == 404
    assert b'not found' in rv.data


def test_register(client):
    rv = client.post('/register', data={
        'email': 'new@flaskschool.com',
        'password': 'Password1!',
        'password_confirm': 'Password1!',
        'first_name': 'New',
        'last_name': 'Student'
    }, follow_redirects=True)
    assert rv.status_code == 200
    assert User.objects(email='new@flaskschool.com').first() is not None


def test_login(client):
    rv = client.post('/login', data={
        'email': 'demo@flaskschool.com',
        'password': 'password1'
    }, follow_redirects=True)
    assert rv.status_code == 200
    assert b'already logged in' in rv.data or b'successfully logged in' in rv.data


def test_course_detail(client):
    rv = client.get('/course/C101')
    assert rv.status_code == 200
    assert b'Build web apps with Flask' in rv.data


def test_course_detail_not_found(client):
    rv = client.get('/course/NONEXISTENT', follow_redirects=True)
    assert rv.status_code == 200
    assert b'not found' in rv.data


def test_profile_requires_login(client):
    rv = client.get('/profile', follow_redirects=True)
    assert rv.status_code == 200
    assert b'You need to log in' in rv.data


def test_profile_logged_in(client):
    client.post('/login', data={
        'email': 'demo@flaskschool.com',
        'password': 'password1'
    }, follow_redirects=True)
    rv = client.get('/profile')
    assert rv.status_code == 200
    assert b'Demo' in rv.data
    assert b'Your Schedule' in rv.data
