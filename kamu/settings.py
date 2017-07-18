from .common_settings import *
from .cron_settings import *
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')

DEBUG = True
ALLOWED_HOSTS = []
SECRET_KEY = '5%5*wq!wtipnzre-n!d*6@02j)en6*g1sr+!p1zv-krr$aay1='

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

