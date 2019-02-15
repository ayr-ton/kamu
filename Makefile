prod:
	python manage.py migrate
	python manage.py collectstatic --noinput

dev:
	npm start

test-backend:
	coverage run manage.py test

test-frontend:
	npm test

test: test-backend test-frontend
