prod:
	python manage.py migrate
	npm run-script build
	python manage.py collectstatic --noinput

dev:
	npm run-script start
