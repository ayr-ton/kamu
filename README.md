![Kamu logo](https://raw.githubusercontent.com/twlabs/kamu/master/assets/images/logo.svg)

# Kamu
> "Some books leave us free and some books make us free."
> – Ralph Waldo Emerson

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

Enjoy it <3 
