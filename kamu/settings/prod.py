from .common import *
from whitenoise import WhiteNoise
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

SECURE_SSL_REDIRECT = config('SSL', default=True, cast=bool)
