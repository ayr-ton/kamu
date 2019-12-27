from .common import *
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

SECURE_SSL_REDIRECT = config('SSL', default=True, cast=bool)

DEBUG_PROPAGATE_EXCEPTIONS = True
