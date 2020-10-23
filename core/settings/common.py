import os
from decouple import config, Csv
from dj_database_url import parse as dburl

SETTINGS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.abspath(os.path.join(SETTINGS_DIR, '..'))

SECRET_KEY = config('SECRET_KEY', default='5%5*wq!wtipnzre-n!d*6@02j)en6*g1sr+!p1zv-krr$aay1=')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='', cast=Csv())

default_dburl = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

DATABASES = {
    'default': config('DATABASE_URL', default=default_dburl, cast=dburl)
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'webpack_loader',
    'books',
    'waitlist',
    'django_saml2_auth',
    'filters',
    'import_export',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'core/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages'
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'assets'),
    os.path.join(BASE_DIR, 'public')
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'IGNORE': []
    }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': ('rest_framework.pagination.PageNumberPagination'),
    'PAGE_SIZE': 50
}

if os.environ.get("OKTA_METADATA_URL") is not None:
    SAML2_AUTH = {
        'METADATA_AUTO_CONF_URL': os.environ['OKTA_METADATA_URL'],
        'ENTITY_ID': os.environ['OKTA_ENTITY_ID'],
        'DEFAULT_NEXT_URL': '/',
        'NEW_USER_PROFILE': {
            'USER_GROUPS': [],
            'ACTIVE_STATUS': True,
            'STAFF_STATUS': True,
            'SUPERUSER_STATUS': True,
        },
        'ATTRIBUTES_MAP': {
            'email': 'email',
            'username': 'email',
            'first_name': 'firstName',
            'last_name': 'lastName',
        }
    }

CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')

EMAIL_FROM=os.environ.get('DJANGO_EMAIL_FROM')
EMAIL_HOST=os.environ.get('DJANGO_EMAIL_HOST')
EMAIL_PORT=os.environ.get('DJANGO_EMAIL_PORT')
EMAIL_HOST_USER=os.environ.get('DJANGO_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD=os.environ.get('DJANGO_EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS=True
