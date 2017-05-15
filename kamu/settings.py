from .common_settings import *
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')

DEBUG = True
ALLOWED_HOSTS = []
SECRET_KEY = '5%5*wq!wtipnzre-n!d*6@02j)en6*g1sr+!p1zv-krr$aay1='
SECURE_SSL_REDIRECT = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

SAML2_AUTH['METADATA_AUTO_CONF_URL'] = 'https://thoughtworks.oktapreview.com/app/exk4v36owiuXaaDq50h7/sso/saml/metadata'