![Logo of the project](https://raw.githubusercontent.com/jehna/readme-best-practices/master/sample-logo.png)

# Kamu
> "Some books leave us free and some books make us free."
> – Ralph Waldo Emerson

Kamu is an application that focus on managing a physical library, you can add books, borrow and return them. 

## Requirements

1. Python 3.7+
2. Node js

## Installing / Getting started

Here is a quick step-by-step minimal setup you need to get the local app up &
running in your workstation:

Clone kamu repo:

```shell
git clone https://github.com/twlabs/kamu.git

```
Open terminal and move to root folder:

```shell
cd kamu
```

Create the virtual enviroment:

```shell
python3 -m venv myenv
```
Activate the virtual enviroment (this command can change based on OS):

```shell
source myenv/bin/activate
```
Install project requirements:

```shell
pip install -r requirements.txt
```

Install project dependencies:
```shell
npm install
```

Create database tables:
```shell
python manage.py migrate
```

Load initial dump data
```shell
python manage.py loaddata dump_data/*.json
```

Start local server & run app
```shell
npm start
```
Enjoy it <3 
