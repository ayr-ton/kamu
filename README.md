# Kamu
> "Some books leave us free and some books make us free."
> – Ralph Waldo Emerson

[![Build Status](https://circleci.com/gh/ayr-ton/kamu.svg?style=svg)](https://circleci.com/gh/ayr-ton/kamu) [![Test Coverage](https://api.codeclimate.com/v1/badges/a16bb5d5b3c9e9557b2f/test_coverage)](https://codeclimate.com/github/ayr-ton/kamu/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/a16bb5d5b3c9e9557b2f/maintainability)](https://codeclimate.com/github/ayr-ton/kamu/maintainability)

Join the Telegram contributors chat at https://t.me/joinchat/AfhaV0XSlMTeaWgWcqALcQ

Kamu is an application that focus on managing a physical library where you can add books, borrow and return them.

In the main page you can see the libraries shared between users. The libraries can be different unities, cities or name of friends that wants to share books. In the Screenshoot bellow, you can see an example of multiple libraries. 

![Screenshoot for Kamu's multiple libraries](https://github.com/flavia-by-flavia/kamu/raw/b8c728301b9647e092c06aff6ed26a7bd7922397/Screen%20Shot%202018-10-18%20at%2018.47.23.png)

## Requirements

- Python 3.6+ for Django backend
- Node.js 8+ for frontend assets

## Installation / Getting started

Here is a quick step-by-step minimal setup, to get the app up and running in your local workstation:

### MacOS specific
To install Node.js and npm you can either download it from the [node.js homepage](https://nodejs.org/en/download/) or install it using [homebrew](https://brew.sh):

```shell
brew install node
```

### Platform independent
Create Python virtual enviroment:

```shell
python3 -m venv venv
```

Activate virtual enviroment (this command can change based on OS):

```shell
source venv/bin/activate
```

Install backend dependencies using pip:

```shell
pip install -r requirements.txt
```

Install frontend dependencies using npm:

```shell
npm install
```

Create database tables:

```shell
python manage.py migrate
```

Create a super user:

```shell
python manage.py createsuperuser
```

You will use this super user to login as administrator in your local Kamu application.


Seed the database with initial dump data:

```shell
python manage.py loaddata dump_data/*.json
```

Start your local server:

```shell
npm start
```

Now just go to [http://localhost:8000](http://localhost:8000) in your browser :)

**For local setup with Okta authentication:**
Use the `OKTA_METADATA_URL` environment variable, concatenating it with the usual commands. Examples:

```shell
  OKTA_METADATA_URL='url-of-okta-saml' npm start
  OKTA_METADATA_URL='url-of-okta-saml' python manage.py migrate
```

Another way is to export the var and then execute the commands:

```shell
  export OKTA_METADATA_URL='url-of-okta-saml'
  npm start
  python manage.py migrate
```

If you wish to disable Okta authentication again, execute:

```shell
  unset OKTA_METADATA_URL
```

## Executing using Docker for local development

Remember to create a `.env` file with all the environment variables you need for spining up the environment.

For building the image:

```shell
  docker-compose build
```

Create database tables:

```shell
  docker-compose up -d database
  docker-compose run --rm web python manage.py migrate
```

Create a super user (for non Okta based usage):

```shell
  docker-compose run --rm web python manage.py createsuperuser
```

You will use this super user to login as administrator in your local Kamu application.


Seed the database with initial dump data:

```shell
  docker-compose run --rm web python manage.py loaddata dump_data/*.json
```

Start your local server:

```shell
  docker-compose up -d web
```

Now just go to [http://localhost:8000](http://localhost:8000) in your browser :)

## Deployment

We have out of the box support for [Heroku :dragon:](https://www.heroku.com/) and [Dokku :whale:](http://dokku.viewdocs.io/dokku/)

For deployment, create a new Python app and set the remote origin from Dokku or Heroku, push it and enable the Postgres plugin.

The buildpacks should configure all the necessary libraries for you.

Now, we need the following environment variables before running Kamu for the first time:
```shell
SECRET_KEY="django-secret-key" # https://duckduckgo.com/?q=django+secret+key+generator
DEBUG="true" # Or false, depending if is a testing or production app
DJANGO_SETTINGS_MODULE="kamu.settings.prod" # If you plan to run a testing version
DATABASE_URL="" # This variable should be automatically configured by the postgres extension.
ALLOWED_HOSTS="kamu.example.com, kamu.heroku.etc"
OKTA_METADATA_URL="SECRET-OKTA-STUFF" # On the case of Okta Authentication support
ANALYTICS_ACCOUNT_ID="UA-123456789-1" # Only if you want to enable Google Analytics, otherwise don't set it
SENTRY_DSN="SECRET-SENTRY-DSN" # Only if you want to enable Sentry, otherwise don't set it
```
See [Dokku environment variables](http://dokku.viewdocs.io/dokku/configuration/environment-variables/) or [Heroku Config Vars](https://devcenter.heroku.com/articles/config-vars) for more details.

On non Okta based deployments, you should run either `dokku run kamu /bin/bash` or `heroku run /bin/bash -a kamu` (On this case, kamu is app name)
```shell
python manage.py createsuperuser
```
See [#74](https://github.com/ayr-ton/kamu/issues/74)

![Thanks!](http://gifgifmagazine.com/wp-content/uploads/2018/11/macka-daj-pet-jea.gif)
