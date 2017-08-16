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

**For setup local with authenticate with Okta Preview:**
Use the "OKTA_METADATA_URL='url-of-okta-saml'" concatenating with the python's commands:

```shell
  Examples:  
  OKTA_METADATA_URL='url-of-okta-saml' yarn start
  OKTA_METADATA_URL='url-of-okta-saml' python manage.py migrate
```

Another way is to export the var and then execute the commands:

```shell
  export OKTA_METADATA_URL='url-of-okta-saml'
  yarn start
  python manage.py migrate
```
In case of need authenticate without Okta preview again, execute:

```shell
  unset OKTA_METADATA_URL
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


## Running and configuring cronjobs

The cronjobs use Unix's crontabs, so it doesn't run on Windows systems.

If you want to run the cronjobs you need to configure the following environment variables, used to send the email reminders:

```shell
export DJANGO_EMAIL_HOST=localhost
export DJANGO_EMAIL_PORT=2525
export DJANGO_EMAIL_TIMEOUT=1
export DJANGO_EMAIL_CRON_FROM=example@domain.com
```

To setup the cronjobs run:

```shell
python manage.py crontab add
```

Once you run that command it will register the cronjob with a hash. The SO will begin to execute the job according to the configuration, even if you shutdown the machine, when you start it again the cronjobs will begin to execute again.

To remove (and stop) the jobs execute:

```shell
python manage.py crontab remove
```

To show the current jobs running execute:

```shell
python manage.py crontab show
```

To run immediately execute:

```
python manage.py crontab run hash-of-the-cronjob
```

If there's a problem during the job execution it will create a text in /var/mail/username that content the error.
Most errors will come because the env vars are not set globally, due to the fact that crontab run in its own session.
