prod:
	python manage.py migrate
	yarn build
	python manage.py collectstatic --noinput

dev:
	yarn start