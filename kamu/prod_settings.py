from .common_settings import *
import os
import dj_database_url


PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')

if os.environ['DEBUG'] == 'true':
    DEBUG = True
else:
    DEBUG = False

ALLOWED_HOSTS = [os.environ['ALLOWED_HOSTS']]
SECRET_KEY = os.environ['SECRET_KEY']
SECURE_SSL_REDIRECT = True

if os.environ['DATABASE_URL']:
    DATABASES = {
        'default': dj_database_url.config()
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['DATABASE_NAME'],
            'USER': os.environ['DATABASE_USER'],
            'PASSWORD': os.environ['DATABASE_PASSWORD'],
            'HOST': os.environ['DATABASE_HOST'],
            'PORT': '5432',
        }
    }
