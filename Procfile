web: gunicorn core.wsgi --log-file - --capture-output
worker: celery -A core worker --loglevel=info
