prod:
	python manage.py migrate &
	yarn build
	python manage.py collectstatic --noinput
	gunicorn kamu.wsgi --log-file -

dev:
	yarn start

dev-disable-okta:
	DISABLE_SAML2=true yarn start