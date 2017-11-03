prod:
	python manage.py migrate &
	yarn build
	python manage.py collectstatic --noinput
	#gunicorn kamu.wsgi --log-file -
	waitress-serve --port=$(PORT) kamu.wsgi:application

dev:
	yarn start