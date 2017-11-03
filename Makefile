prod:
	python manage.py migrate &
	yarn build
	python manage.py collectstatic --noinput
	bin/start-pgbouncer-stunnel gunicorn kamu.wsgi --log-file -

dev:
	yarn start