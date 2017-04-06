from .common_settings import *
import os


DEBUG = True
ALLOWED_HOSTS = ['staging-kamu.herokuapp.com', 'kamu.herokuapp.com']
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

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