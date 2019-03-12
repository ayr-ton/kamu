prod:
	python manage.py migrate
	python manage.py collectstatic --noinput

dev:
	npm start

test-backend:
	DJANGO_SETTINGS_MODULE=kamu.settings.test \
	coverage run manage.py test

test-frontend:
	npm test

test: test-backend test-frontend
