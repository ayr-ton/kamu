from .common_settings import *
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')

if os.environ['ENV'] == 'staging':
    DEBUG = True
else:
    DEBUG = False

ALLOWED_HOSTS = ['staging-kamu.herokuapp.com', 'kamu.herokuapp.com', 'kamu.thoughtworks-labs.net', 'staging-kamu.thoughtworks-labs.net']
SECRET_KEY = os.environ['SECRET_KEY']
SECURE_SSL_REDIRECT = True

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

SAML2_AUTH['METADATA_AUTO_CONF_URL'] = os.environ['OKTA_METADATA_URL']