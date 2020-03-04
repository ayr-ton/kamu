web: gunicorn core.wsgi --bind 0.0.0.0 --log-file - --capture-output
worker: celery -A core worker --loglevel=info
