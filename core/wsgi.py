import os

from django.core.wsgi import get_wsgi_application
from decouple import config

DJANGO_SETTINGS_MODULE = config('DJANGO_SETTINGS_MODULE', default='core.settings.dev')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', DJANGO_SETTINGS_MODULE)

application = get_wsgi_application()
