# Comp 250: Exercise - Full Stack

<!-- TABLE OF CONTENTS -->
**Table of Contents:**

- [Comp 250: Exercise - Full Stack](#comp-250-exercise---full-stack)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Virtual Environment (`venv`)](#virtual-environment-venv)
    - [Running the project](#running-the-project)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

**[View this project here!](https://flask-brennan.herokuapp.com/)**

This website is a mock application for registering for an online school, and enroll in specific web development courses. It utilizes Flask for the back-end, and MongoDB's MQL for the collections (database). This is currently being deployed on [Heroku](https://dashboard.heroku.com/) under a free Dyno plan, so I apologize for any issues regarding speed or connectivity!

For more information about specific areas of this project, please refer to my **[personal notes](https://github.com/brennanbrown/cohort4/blob/flask/NOTES.md)**.

### Built With

* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
    - [Jinja](http://jinja.pocoo.org/docs)
    - [Werkzeug](https://www.palletsprojects.com/p/werkzeug/)
* [MongoDB](mongodb.com)
* [Bootstrap](https://getbootstrap.com)

<!-- GETTING STARTED -->
## Getting Started

For development, you will need Python 3.6 or higher, pip, venv, and MongoDB installed in your environment.

### Prerequisites

* A good understanding of web development (HTML, CSS, JavaScript)
* Basic knowledge of Python and NoSQL database systems
* Familar with Flask framework for front-end development
* Object-oriented Programming (OOP) paradigm
* Model-View-Controller (MVC) paradigm
* Model-View-ViewMode (MVVM) paradigm
* Knowledge and use of the Command-line Interface (CLI)

- #### Python installation on Ubuntu

Check first to see if you have the tools required already installed:

    $ python3 --version
    $ pip --version

Head over to the [official Python website](https://www.python.org/downloads/) and download the installer
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

You can install Python and pip easily with apt install, just run the following commands:

    $ sudo apt install python3
    $ sudo apt install pip3

If you need to update `pip`, you can make it using `pip`! Cool right? After running the following command, just open again the command line and be happy.

    $ python3 -m pip install --upgrade pip

- #### MongoDB installation on Ubuntu

If you prefer working with the command line, here's [how to install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/), if you'd prefer a GUI interface, try downloading [MongoDB Compass](https://www.mongodb.com/try/download/compass).

To begin MongoDB via the command line:

    $ sudo systemctl start mongod

To begin the Compass GUI:

    $ mongodb-compass

Please note for sake of ease, his project is set to work with the default configurations of MongoDB on a local installation.

---

## Installation

    $ git clone --single-branch --branch flask https://github.com/brennanbrown/cohort4.git
    $ cd cohort4

### Virtual Environment (`venv`)

    $ python3 -m venv env
    $ . env/bin/activate
    $ pip install -r requirements.txt

You can ensure that you're in your new virutal Environment if you see `(env)` prepend your bash shell:

    $ (env) user@ubuntu:~/flask$ 

### Running the project

    $ flask run

Once the server has started up, you can visit it at [localhost:5000/](localhost:5000/), or [127.0.0.1:5000/](127.0.0.1:5000/).

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/brennanbrown/cohort4/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Brennan K. Brown - [@brennankbrown](https://twitter.com/brennanbrown) - [mail@brennanbrown.ca](mailto:mail@brennanbrown.ca)

Project Link: [https://github.com/brennanbrown/cohort4](https://github.com/brennanbrown/cohort4/tree/flask)