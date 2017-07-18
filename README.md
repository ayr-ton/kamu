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

Here is a quick step-by-step minimal setup you need to get the local app up and running in your workstation:

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

---
**For setup local with authenticate with Okta Preview:**
Use the "OKTA_METADATA_URL='url-of-okta-saml'" concatenating with the commands the Python:

```shell
  Examples:  
  OKTA_METADATA_URL='url-of-okta-saml' yarn start
  OKTA_METADATA_URL='url-of-okta-saml' python manage.py migrate
```

Other form the going is export this parameter before the execute os commands do Python:

```shell
  OKTA_METADATA_URL='url-of-okta-saml'
  yarn start
  python manage.py migrate
```

Case necessity execute application without authenticate by Okta Preview again, enough execute the command:

```shell
  unset OKTA_METADATA_URL
```

Finally, is necessary to create a super user using the command:

```shell
python manage.py createsuperuser
```
---

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


## Running and configuring cronjobs

The cronjobs use the unix's crontabs, so it doesn't run on windows systems.

If you want to run the cronjobs you need to configure the next OS ENV
```shell
export DJANGO_EMAIL_HOST=localhost
export DJANGO_EMAIL_PORT=2525
export DJANGO_EMAIL_TIMEOUT=1
export DJANGO_EMAIL_CRON_FROM=example@domain.com
```
To run the test the env vars are no needed since it use a fake server.

To add the cronjobs defined in kamu run:

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
Most error will come because the env vars are not set globally, due to the fact that crontab run in his own session
