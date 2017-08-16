# Kamu
> "Some books leave us free and some books make us free."
> – Ralph Waldo Emerson

[![Build Status](https://travis-ci.com/ayr-ton/kamu.svg?token=KGsd1SkDsTdBvgkTgbtG&branch=master)](https://travis-ci.com/ayr-ton/kamu)
[![Join the chat at https://gitter.im/pykamu/Lobby](https://badges.gitter.im/pykamu/Lobby.svg)](https://gitter.im/pykamu/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Kamu is an application that focus on managing a physical library where you can add books, borrow and return them.

## Requirements

- Python 3.6+ for Django backend
- Node.js 6.10+ for frontend assets

## Installation / Getting started

Here is a quick step-by-step minimal setup, to get the app up and running in your local workstation:

Clone this repo and open the root folder:

```shell
git clone https://github.com/twlabs/kamu.git
cd kamu
```

Create Python virtual enviroment:

```shell
python3 -m venv kamu
```

Activate virtual enviroment (this command can change based on OS):

```shell
source kamu/bin/activate
```

Install backend dependencies using pip:

```shell
pip install -r requirements.txt
```

Install frontend dependencies using [Yarn](http://yarnpkg.com):

```shell
yarn install
```

To execute local application without Okta Preview authentication, set DISABLE_SAML2 variable:

```shell
  export DISABLE_SAML2=true
```

In case you need to execute with Okta Preview authentication, unset the DISABLE_SAML2 variable:

```shell
  unset DISABLE_SAML2=true
```

Create a super user:

```shell
python manage.py createsuperuser
```

You will use this super user to login as administrator in your local kamu application.

Create database tables:

```shell
python manage.py migrate
```

Seed the database with initial dump data:

```shell
python manage.py loaddata dump_data/*.json
```

Start your local server:

```shell
yarn start
```

Now just go to [http://localhost:8000](http://localhost:8000) in your browser :)