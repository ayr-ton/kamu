worker: python manage.py migrate && yarn build && python manage.py collectstatic --noinput
web: gunicorn kamu.wsgi --log-file -
