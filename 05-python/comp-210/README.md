# COMP-210: Python Enviornments

## Pipenv Research

### What is Pipenv?

From [the docs](https://pipenv-fork.readthedocs.io/en/latest/): Pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world. Windows is a first-class citizen, in our world.

It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important `Pipfile.lock`, which is used to produce deterministic builds.

Pipenv is primarily meant to provide users and developers of applications with an easy method to setup a working environment.

Put simply, Pipenv is a dependency manager for Python projects. Pipenv is recommended as its higher level tool that simplifies dependency management for common use cases.

Note: Pipfiles contain information about the dependencies of your project, and supercede the requirements.txt file that is typically used in Python projects. If you’ve initiated Pipenv in a project with an existing `requirements.txt` file, you should install all the packages listed in that file using Pipenv, before removing it from the project.

### Usage

From [Open Source](https://opensource.com/article/18/2/why-python-devs-should-use-pipenv): Pipenv aims to solve several problems.

First, the problem of needing the pip library for:

* Package installation
* A library for creating a virtual environment
* A library for managing virtual environments
* All the commands associated with those libraries

That's a lot to manage. Pipenv ships with package management and virtual environment support, so you can use one tool to:

* Install, uninstall, track, and document your dependencies
* Create, use, and organize your virtual environments 

Pipenv accomplishes this dependency management by abandoning the requirements.txt norm and trading it for a new document called a Pipfile. 

When you install a library with Pipenv, a `Pipfile` for your project is automatically updated with the details of that installation, including:

* Version information
* Git repository location
* File path location, and other information

Second, Pipenv wants to make it easier to manage complex interdependencies. Your app might depend on a specific version of a library, and that library might depend on a specific version of another library, and it's just dependencies and turtles all the way down. 

When two libraries your app uses have conflicting dependencies, your life can become hard. Pipenv wants to ease that pain by keeping track of a tree of your app's interdependencies in a file called `Pipfile.lock`. Pipfile.lock also verifies that the right versions of dependencies are used in production.

Finally, using Pipenv signals to other people who work on your project that it ships with a standardized way to install project dependencies and development and testing requirements. 

Using a workflow with pip and requirements files means that you may have one single `requirements.txt` file, or several requirements files for different environments. It might not be clear to your colleagues whether they should run `dev.txt` or `local.txt` when they're running the project on their laptops, for example.

### Best Practices

From [the Docs](https://docs.python-guide.org/dev/virtualenvs/): Running virtualenv with the option `--no-site-packages` will not include the packages that are installed globally. This can be useful for keeping the package list clean in case it needs to be accessed later. [This is the default behavior for virtualenv 1.7 and later.]

In order to keep your environment consistent, it’s a good idea to “freeze” the current state of the environment packages. To do this, run:

```bash
$ pip freeze > requirements.txt
```

This will create a `requirements.txt file`, which contains a simple list of all the packages in the current environment, and their respective versions. You can see the list of installed packages without the requirements format using pip list. Later it will be easier for a different developer (or you, if you need to re-create the environment) to install the same packages using the same versions:

```bash
$ pip install -r requirements.txt
```

This can help ensure consistency across installations, across deployments, and across developers.

Lastly, remember to exclude the virtual environment folder from source control by adding it to the ignore list.

### Commands

From [the Docs](https://docs.python-guide.org/dev/virtualenvs/): Installing packages for your project:

Pipenv manages dependencies on a per-project basis. To install packages, change into your project’s directory (or just an empty directory for this tutorial) and run:

```bash
$ cd project_folder
$ pipenv install requests
```

Pipenv will install the excellent Requests library and create a Pipfile for you in your project’s directory. The Pipfile is used to track which dependencies your project needs in case you need to re-install them, such as when you share your project with others. You should get output similar to this (although the exact paths shown will vary):

```bash
Creating a Pipfile for this project...
Creating a virtualenv for this project...
Using base prefix '/usr/local/Cellar/python3/3.6.2/Frameworks/Python.framework/Versions/3.6'
New python executable in ~/.local/share/virtualenvs/tmp-agwWamBd/bin/python3.6
Also creating executable in ~/.local/share/virtualenvs/tmp-agwWamBd/bin/python
Installing setuptools, pip, wheel...done.

Virtualenv location: ~/.local/share/virtualenvs/tmp-agwWamBd
Installing requests...
Collecting requests
  Using cached requests-2.18.4-py2.py3-none-any.whl
Collecting idna<2.7,>=2.5 (from requests)
  Using cached idna-2.6-py2.py3-none-any.whl
Collecting urllib3<1.23,>=1.21.1 (from requests)
  Using cached urllib3-1.22-py2.py3-none-any.whl
Collecting chardet<3.1.0,>=3.0.2 (from requests)
  Using cached chardet-3.0.4-py2.py3-none-any.whl
Collecting certifi>=2017.4.17 (from requests)
  Using cached certifi-2017.7.27.1-py2.py3-none-any.whl
Installing collected packages: idna, urllib3, chardet, certifi, requests
Successfully installed certifi-2017.7.27.1 chardet-3.0.4 idna-2.6 requests-2.18.4 urllib3-1.22

Adding requests to Pipfile's [packages]...
P.S. You have excellent taste! ✨ 🍰 ✨
```

Using installed packages:

Now that Requests is installed you can create a simple `main.py` file to use it:

```python
import requests

response = requests.get('https://httpbin.org/ip')

print('Your IP is {0}'.format(response.json()['origin']))
```

Then you can run this script using pipenv run:

```bash
$ pipenv run python main.py
```

You should get output similar to this:

```bash
Your IP is 8.8.8.8
```

Using `$ pipenv run` ensures that your installed packages are available to your script. It’s also possible to spawn a new shell that ensures all commands have access to your installed packages with $ pipenv shell.

More commands: (taken from [here](https://gist.github.com/bradtraversy/c70a93d6536ed63786c434707b898d55))

* Install pipenv: `pip3 install pipenv`
* Activate: `pipenv shell`
* Check version of Python: `python3 --version`
* Install a package: `pipenv install camelcase`
* Check local packages: `pipenv lock -r`
* Uninstall a package: `pipenv uninstall camelcase`
* Install a dev package: `pipenv install nose --dev`
* Install from requirements.txt: `pipenv install -r ./requirements.txt`
* Check security vulnerabilities: `pipenv check`
* Check dependency graph: `pipenv graph`
* Ignore pipfile: `pipenv install --ignore-pipfile`
* Set lockfile - before deployment: `pipenv lock`
* Exiting the virtualenv: `exit`
* Run with pipenv: `pipenv run *`
* Check path:

```bash
python
>>> import sys
>>> sys.executable
quit()
```

