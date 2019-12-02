import os

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise
from decouple import config

DJANGO_SETTINGS_MODULE = config('DJANGO_SETTINGS_MODULE', default='core.settings.dev')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', DJANGO_SETTINGS_MODULE)

application = DjangoWhiteNoise(get_wsgi_application())
