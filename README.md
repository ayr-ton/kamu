# Kamu
> "Some books leave us free and some books make us free."
> – Ralph Waldo Emerson

[![Build Status](https://travis-ci.com/ayr-ton/kamu.svg?token=KGsd1SkDsTdBvgkTgbtG&branch=master)](https://travis-ci.com/ayr-ton/kamu)
[![Join the chat at https://gitter.im/pykamu/Lobby](https://badges.gitter.im/pykamu/Lobby.svg)](https://gitter.im/pykamu/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Kamu is an application that focus on managing a physical library, you can add books, borrow and return them. 

## Requirements

- Python 3.6+ for the Django backend
- Node.js 6.10+ for the frontend assets

## Installation / Getting started

Here is a quick step-by-step minimal setup you need to get the local app up and
running in your workstation:

Clone this repo and open the root folder:

```shell
git clone https://github.com/twlabs/kamu.git
cd kamu
```

Create the Python virtual enviroment:

```shell
python3 -m venv kamu
```

Activate the virtual enviroment (this command can change based on OS):

```shell
source kamu/bin/activate
```

Install the backend dependencies using pip:

```shell
pip install -r requirements.txt
```

Install the frontend dependencies using [Yarn](http://yarnpkg.com):

```shell
yarn install
```

Create the database tables:

```shell
python manage.py migrate
```

Seed the database with initial dump data:

```shell
python manage.py loaddata dump_data/*.json
```

Start the development server:

```shell
yarn start
```

Now just go to [http://localhost:8000](http://localhost:8000) in your browser :)


## Running and configuring Cronjobs

The cronjobs use the crontabs of unix system, so it doesn't run on windows systems.
To add the cronjobs defines in kamu run:

```shell
DISABLE_SAML2=true ./manage.py crontab add
```
Once you run that command it will register the cronjob and the SO will begin to execute the job according to the confoguration.

To remove (and stop) the jobs execute:
```shell
DISABLE_SAML2=true ./manage.py crontab remove
```

To show the current jobs running execute:
```shell
DISABLE_SAML2=true ./manage.py crontab show
```



